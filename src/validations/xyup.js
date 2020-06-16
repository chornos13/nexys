/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
const yup = require('yup')
const moment = require('moment')
const { isFunction, isDate, isArray } = require('lodash')

function CreateId(baseSchema, msgInvalid, required) {
  if (required) {
    baseSchema = baseSchema.required(msgInvalid)
  }
  baseSchema = baseSchema.typeError(msgInvalid)
  return baseSchema
}

function string(msgRequired, required = true) {
  let schema = yup.string()
  if (required) {
    schema = schema.required(msgRequired)
  }
  return schema
}

function number(msgRequired, required = true) {
  let schema = yup.number()
  if (required) {
    schema = schema.required(msgRequired)
  }
  return schema
}

function mixed(msgRequired, required = true) {
  let schema = yup.mixed()
  if (required) {
    schema = schema.required(msgRequired)
  }
  return schema
}

function date(msgRequired, required = true) {
  let schema = yup.date()
  if (required) {
    schema = schema.required(msgRequired)
  }
  return schema
}

function id(msgInvalid, required = true) {
  return CreateId(yup.number(), msgInvalid, required).min(1, msgInvalid)
}

function uuid(msgInvalid, required = true) {
  return CreateId(yup.string(), msgInvalid, required)
}

yup.addMethod(yup.string, 'errorsMessage', function(message, methods) {
  let custom = this
  const cMethods = methods || []
  for (let i = 0; i < cMethods.length; i += 1) {
    const method = cMethods[i]
    custom = custom[method](message)
  }
  return custom
})

class Mixed {
  static get When() {
    return {
      valueExist(keys, newSchema) {
        return [
          keys,
          (val, schema) => {
            let curNewSchema = newSchema
            if (isFunction(newSchema)) {
              curNewSchema = newSchema(schema)
            }
            return val ? curNewSchema : schema
          },
        ]
      },
      valueEqual(keys, value, newSchema, options) {
        return [
          keys,
          {
            is: value,
            then: newSchema,
            ...(options || {}),
          },
        ]
      },
    }
  }
}

class Date {
  static get Test() {
    const baseCompareDate = (
      fnName,
      keyOrDate,
      errorMessage,
      options = {
        formatDateString: undefined,
        unitOfTime: 'second',
        name: 'is-greater',
        defaultErrorMessage: `\${path} should be same or greater`,
      },
    ) => {
      const {
        formatDateString,
        unitOfTime,
        defaultErrorMessage,
        name,
      } = options
      return [
        name,
        errorMessage || defaultErrorMessage,
        function(value) {
          let cmpValue = keyOrDate
          if (!isDate(keyOrDate)) {
            cmpValue = this.parent[keyOrDate]
          }
          return moment(value, formatDateString)[fnName](
            moment(cmpValue, formatDateString),
            unitOfTime,
          )
        },
      ]
    }

    return {
      // formatDateString: ex HH:mm

      shouldSameOrBefore(
        keyOrDate,
        errorMessage,
        options = {
          formatDateString: undefined,
          unitOfTime: 'second',
        },
      ) {
        return baseCompareDate('isSameOrBefore', keyOrDate, errorMessage, {
          ...options,
          name: 'shouldSameOrBefore',
          defaultErrorMessage: `\${path} should be same or less`,
        })
      },

      shouldSameOrAfter(
        keyOrDate,
        errorMessage,
        options = {
          formatDateString: undefined,
          unitOfTime: 'second',
        },
      ) {
        return baseCompareDate('isSameOrAfter', keyOrDate, errorMessage, {
          ...options,
          name: 'shouldSameOrAfter',
          defaultErrorMessage: `\${path} should be same or greater`,
        })
      }, // formatDateString: ex HH:mm

      shouldBefore(
        keyOrDate,
        errorMessage,
        options = {
          formatDateString: undefined,
          unitOfTime: 'second',
        },
      ) {
        return baseCompareDate('isBefore', keyOrDate, errorMessage, {
          ...options,
          name: 'shouldBefore',
          defaultErrorMessage: `\${path} should be less`,
        })
      },

      shouldAfter(
        keyOrDate,
        errorMessage,
        options = {
          formatDateString: undefined,
          unitOfTime: 'second',
        },
      ) {
        return baseCompareDate('isAfter', keyOrDate, errorMessage, {
          ...options,
          name: 'shouldAfter',
          defaultErrorMessage: `\${path} should be greater`,
        })
      },
    }
  }

  static get When() {
    return {
      before(key, errorMessage) {
        return [
          key,
          (st, schema) => {
            return schema.min(
              st,
              errorMessage ||
                `\${path} field must be later than ${moment(st).format(
                  'DD-MM-YYYY',
                )}`,
            )
          },
        ]
      },
    }
  }
}

const GET_DEFAULT_OPTIONS = () => ({
  language: 'id',
  strips: [],
  only: [],
  extraSchema: {},
  rawSchema: false,
  groupArrayWithKey: '',
  groupObjectWithKey: '',
  extendGroupSchema: schema => {
    return schema
  },
})

const stripSchema = (shapeSchema, strips = []) => {
  // warn: this mutate object schema
  if (isArray(strips)) {
    for (let i = 0; i < strips.length; i += 1) {
      const ignore = strips[i]
      shapeSchema[ignore] = yup.mixed().strip()
    }
  }
}

const onlySchema = (shapeSchema, onlySchema = []) => {
  // warn: this mutate object schema
  if (isArray(onlySchema) && onlySchema.length > 0) {
    const keys = Object.keys(shapeSchema)
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i]
      if (!onlySchema.includes(key)) {
        delete shapeSchema[key]
      }
    }
  }
}

const assignExtraSchema = (shapeSchema, extraSchema) => {
  // warn: this mutate object schema
  const keys = Object.keys(extraSchema)

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    shapeSchema[key] = extraSchema[key]
  }
}

function getSchemaValue(shapeSchema, options) {
  const {
    rawSchema,
    groupArrayWithKey,
    groupObjectWithKey,
    extendGroupSchema: _extendGroupSchema,
  } = options

  const extendGroupSchema =
    _extendGroupSchema || GET_DEFAULT_OPTIONS().extendGroupSchema

  if (groupArrayWithKey) {
    const raw = {
      [groupArrayWithKey]: extendGroupSchema(
        yup.array().of(yup.object().shape(shapeSchema)),
      ),
    }
    if (rawSchema) {
      return raw
    }
    return yup.object().shape(raw)
  }

  if (groupObjectWithKey) {
    const raw = {
      [groupObjectWithKey]: extendGroupSchema(yup.object().shape(shapeSchema)),
    }
    if (rawSchema) {
      return raw
    }
    return yup.object().shape(raw)
  }

  if (rawSchema) return shapeSchema

  return yup.object().shape(shapeSchema)
}

function generateFormSchema(getShapeSchema) {
  function transformSchemaByOptions(required, options) {
    const { language, strips, extraSchema, only } = Object.assign(
      GET_DEFAULT_OPTIONS(),
      options,
    )
    const shapeSchema = getShapeSchema(required, language)
    onlySchema(shapeSchema, only)
    stripSchema(shapeSchema, strips)
    assignExtraSchema(shapeSchema, extraSchema)
    return shapeSchema
  }

  const getCreateSchema = function getCreateSchema(
    options = GET_DEFAULT_OPTIONS(),
  ) {
    const shapeSchema = transformSchemaByOptions(false, options)
    /*
     hapus id dari schema untuk menghindari id dibuat manual
     melalui API
    */
    shapeSchema.id = yup.mixed().strip()

    return getSchemaValue(shapeSchema, options)
  }

  const getDefaultSchema = function getDefaultSchema(
    options = GET_DEFAULT_OPTIONS(),
  ) {
    const shapeSchema = transformSchemaByOptions(false, options)

    return getSchemaValue(shapeSchema, options)
  }

  const getUpdateSchema = function getUpdateSchema(
    options = GET_DEFAULT_OPTIONS(),
  ) {
    const shapeSchema = transformSchemaByOptions(true, options)

    return getSchemaValue(shapeSchema, options)
  }

  return {
    getCreateSchema,
    getUpdateSchema,
    getDefaultSchema,
  }
}

class Type {
  static email(message) {
    return yup.string().email(message)
  }

  static phoneNumber(message) {
    return yup
      .string()
      .test('len', message, val => val && val.toString().length >= 8)
  }
}

module.exports = {
  id,
  uuid,
  string,
  number,
  date,
  mixed,
  Date,
  Mixed,
  Type,
  generateFormSchema,
}
