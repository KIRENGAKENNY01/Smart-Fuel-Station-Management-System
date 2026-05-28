
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FuelReport
 * 
 */
export type FuelReport = $Result.DefaultSelection<Prisma.$FuelReportPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FuelReports
 * const fuelReports = await prisma.fuelReport.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FuelReports
   * const fuelReports = await prisma.fuelReport.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.fuelReport`: Exposes CRUD operations for the **FuelReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FuelReports
    * const fuelReports = await prisma.fuelReport.findMany()
    * ```
    */
  get fuelReport(): Prisma.FuelReportDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FuelReport: 'FuelReport'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "fuelReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      FuelReport: {
        payload: Prisma.$FuelReportPayload<ExtArgs>
        fields: Prisma.FuelReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FuelReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FuelReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>
          }
          findFirst: {
            args: Prisma.FuelReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FuelReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>
          }
          findMany: {
            args: Prisma.FuelReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>[]
          }
          create: {
            args: Prisma.FuelReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>
          }
          createMany: {
            args: Prisma.FuelReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FuelReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>[]
          }
          delete: {
            args: Prisma.FuelReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>
          }
          update: {
            args: Prisma.FuelReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>
          }
          deleteMany: {
            args: Prisma.FuelReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FuelReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FuelReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelReportPayload>
          }
          aggregate: {
            args: Prisma.FuelReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFuelReport>
          }
          groupBy: {
            args: Prisma.FuelReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<FuelReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.FuelReportCountArgs<ExtArgs>
            result: $Utils.Optional<FuelReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model FuelReport
   */

  export type AggregateFuelReport = {
    _count: FuelReportCountAggregateOutputType | null
    _avg: FuelReportAvgAggregateOutputType | null
    _sum: FuelReportSumAggregateOutputType | null
    _min: FuelReportMinAggregateOutputType | null
    _max: FuelReportMaxAggregateOutputType | null
  }

  export type FuelReportAvgAggregateOutputType = {
    total_liters_sold: number | null
    total_amount_sold: number | null
  }

  export type FuelReportSumAggregateOutputType = {
    total_liters_sold: number | null
    total_amount_sold: number | null
  }

  export type FuelReportMinAggregateOutputType = {
    id: string | null
    station_id: string | null
    fuel_type_id: string | null
    total_liters_sold: number | null
    total_amount_sold: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FuelReportMaxAggregateOutputType = {
    id: string | null
    station_id: string | null
    fuel_type_id: string | null
    total_liters_sold: number | null
    total_amount_sold: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FuelReportCountAggregateOutputType = {
    id: number
    station_id: number
    fuel_type_id: number
    total_liters_sold: number
    total_amount_sold: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FuelReportAvgAggregateInputType = {
    total_liters_sold?: true
    total_amount_sold?: true
  }

  export type FuelReportSumAggregateInputType = {
    total_liters_sold?: true
    total_amount_sold?: true
  }

  export type FuelReportMinAggregateInputType = {
    id?: true
    station_id?: true
    fuel_type_id?: true
    total_liters_sold?: true
    total_amount_sold?: true
    created_at?: true
    updated_at?: true
  }

  export type FuelReportMaxAggregateInputType = {
    id?: true
    station_id?: true
    fuel_type_id?: true
    total_liters_sold?: true
    total_amount_sold?: true
    created_at?: true
    updated_at?: true
  }

  export type FuelReportCountAggregateInputType = {
    id?: true
    station_id?: true
    fuel_type_id?: true
    total_liters_sold?: true
    total_amount_sold?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FuelReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FuelReport to aggregate.
     */
    where?: FuelReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelReports to fetch.
     */
    orderBy?: FuelReportOrderByWithRelationInput | FuelReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FuelReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FuelReports
    **/
    _count?: true | FuelReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FuelReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FuelReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FuelReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FuelReportMaxAggregateInputType
  }

  export type GetFuelReportAggregateType<T extends FuelReportAggregateArgs> = {
        [P in keyof T & keyof AggregateFuelReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFuelReport[P]>
      : GetScalarType<T[P], AggregateFuelReport[P]>
  }




  export type FuelReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FuelReportWhereInput
    orderBy?: FuelReportOrderByWithAggregationInput | FuelReportOrderByWithAggregationInput[]
    by: FuelReportScalarFieldEnum[] | FuelReportScalarFieldEnum
    having?: FuelReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FuelReportCountAggregateInputType | true
    _avg?: FuelReportAvgAggregateInputType
    _sum?: FuelReportSumAggregateInputType
    _min?: FuelReportMinAggregateInputType
    _max?: FuelReportMaxAggregateInputType
  }

  export type FuelReportGroupByOutputType = {
    id: string
    station_id: string
    fuel_type_id: string
    total_liters_sold: number
    total_amount_sold: number
    created_at: Date
    updated_at: Date
    _count: FuelReportCountAggregateOutputType | null
    _avg: FuelReportAvgAggregateOutputType | null
    _sum: FuelReportSumAggregateOutputType | null
    _min: FuelReportMinAggregateOutputType | null
    _max: FuelReportMaxAggregateOutputType | null
  }

  type GetFuelReportGroupByPayload<T extends FuelReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FuelReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FuelReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FuelReportGroupByOutputType[P]>
            : GetScalarType<T[P], FuelReportGroupByOutputType[P]>
        }
      >
    >


  export type FuelReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    station_id?: boolean
    fuel_type_id?: boolean
    total_liters_sold?: boolean
    total_amount_sold?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["fuelReport"]>

  export type FuelReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    station_id?: boolean
    fuel_type_id?: boolean
    total_liters_sold?: boolean
    total_amount_sold?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["fuelReport"]>

  export type FuelReportSelectScalar = {
    id?: boolean
    station_id?: boolean
    fuel_type_id?: boolean
    total_liters_sold?: boolean
    total_amount_sold?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $FuelReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FuelReport"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      station_id: string
      fuel_type_id: string
      total_liters_sold: number
      total_amount_sold: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["fuelReport"]>
    composites: {}
  }

  type FuelReportGetPayload<S extends boolean | null | undefined | FuelReportDefaultArgs> = $Result.GetResult<Prisma.$FuelReportPayload, S>

  type FuelReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FuelReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FuelReportCountAggregateInputType | true
    }

  export interface FuelReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FuelReport'], meta: { name: 'FuelReport' } }
    /**
     * Find zero or one FuelReport that matches the filter.
     * @param {FuelReportFindUniqueArgs} args - Arguments to find a FuelReport
     * @example
     * // Get one FuelReport
     * const fuelReport = await prisma.fuelReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FuelReportFindUniqueArgs>(args: SelectSubset<T, FuelReportFindUniqueArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FuelReport that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FuelReportFindUniqueOrThrowArgs} args - Arguments to find a FuelReport
     * @example
     * // Get one FuelReport
     * const fuelReport = await prisma.fuelReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FuelReportFindUniqueOrThrowArgs>(args: SelectSubset<T, FuelReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FuelReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelReportFindFirstArgs} args - Arguments to find a FuelReport
     * @example
     * // Get one FuelReport
     * const fuelReport = await prisma.fuelReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FuelReportFindFirstArgs>(args?: SelectSubset<T, FuelReportFindFirstArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FuelReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelReportFindFirstOrThrowArgs} args - Arguments to find a FuelReport
     * @example
     * // Get one FuelReport
     * const fuelReport = await prisma.fuelReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FuelReportFindFirstOrThrowArgs>(args?: SelectSubset<T, FuelReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FuelReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FuelReports
     * const fuelReports = await prisma.fuelReport.findMany()
     * 
     * // Get first 10 FuelReports
     * const fuelReports = await prisma.fuelReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fuelReportWithIdOnly = await prisma.fuelReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FuelReportFindManyArgs>(args?: SelectSubset<T, FuelReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FuelReport.
     * @param {FuelReportCreateArgs} args - Arguments to create a FuelReport.
     * @example
     * // Create one FuelReport
     * const FuelReport = await prisma.fuelReport.create({
     *   data: {
     *     // ... data to create a FuelReport
     *   }
     * })
     * 
     */
    create<T extends FuelReportCreateArgs>(args: SelectSubset<T, FuelReportCreateArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FuelReports.
     * @param {FuelReportCreateManyArgs} args - Arguments to create many FuelReports.
     * @example
     * // Create many FuelReports
     * const fuelReport = await prisma.fuelReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FuelReportCreateManyArgs>(args?: SelectSubset<T, FuelReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FuelReports and returns the data saved in the database.
     * @param {FuelReportCreateManyAndReturnArgs} args - Arguments to create many FuelReports.
     * @example
     * // Create many FuelReports
     * const fuelReport = await prisma.fuelReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FuelReports and only return the `id`
     * const fuelReportWithIdOnly = await prisma.fuelReport.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FuelReportCreateManyAndReturnArgs>(args?: SelectSubset<T, FuelReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FuelReport.
     * @param {FuelReportDeleteArgs} args - Arguments to delete one FuelReport.
     * @example
     * // Delete one FuelReport
     * const FuelReport = await prisma.fuelReport.delete({
     *   where: {
     *     // ... filter to delete one FuelReport
     *   }
     * })
     * 
     */
    delete<T extends FuelReportDeleteArgs>(args: SelectSubset<T, FuelReportDeleteArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FuelReport.
     * @param {FuelReportUpdateArgs} args - Arguments to update one FuelReport.
     * @example
     * // Update one FuelReport
     * const fuelReport = await prisma.fuelReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FuelReportUpdateArgs>(args: SelectSubset<T, FuelReportUpdateArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FuelReports.
     * @param {FuelReportDeleteManyArgs} args - Arguments to filter FuelReports to delete.
     * @example
     * // Delete a few FuelReports
     * const { count } = await prisma.fuelReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FuelReportDeleteManyArgs>(args?: SelectSubset<T, FuelReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FuelReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FuelReports
     * const fuelReport = await prisma.fuelReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FuelReportUpdateManyArgs>(args: SelectSubset<T, FuelReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FuelReport.
     * @param {FuelReportUpsertArgs} args - Arguments to update or create a FuelReport.
     * @example
     * // Update or create a FuelReport
     * const fuelReport = await prisma.fuelReport.upsert({
     *   create: {
     *     // ... data to create a FuelReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FuelReport we want to update
     *   }
     * })
     */
    upsert<T extends FuelReportUpsertArgs>(args: SelectSubset<T, FuelReportUpsertArgs<ExtArgs>>): Prisma__FuelReportClient<$Result.GetResult<Prisma.$FuelReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FuelReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelReportCountArgs} args - Arguments to filter FuelReports to count.
     * @example
     * // Count the number of FuelReports
     * const count = await prisma.fuelReport.count({
     *   where: {
     *     // ... the filter for the FuelReports we want to count
     *   }
     * })
    **/
    count<T extends FuelReportCountArgs>(
      args?: Subset<T, FuelReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FuelReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FuelReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FuelReportAggregateArgs>(args: Subset<T, FuelReportAggregateArgs>): Prisma.PrismaPromise<GetFuelReportAggregateType<T>>

    /**
     * Group by FuelReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FuelReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FuelReportGroupByArgs['orderBy'] }
        : { orderBy?: FuelReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FuelReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFuelReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FuelReport model
   */
  readonly fields: FuelReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FuelReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FuelReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FuelReport model
   */ 
  interface FuelReportFieldRefs {
    readonly id: FieldRef<"FuelReport", 'String'>
    readonly station_id: FieldRef<"FuelReport", 'String'>
    readonly fuel_type_id: FieldRef<"FuelReport", 'String'>
    readonly total_liters_sold: FieldRef<"FuelReport", 'Float'>
    readonly total_amount_sold: FieldRef<"FuelReport", 'Float'>
    readonly created_at: FieldRef<"FuelReport", 'DateTime'>
    readonly updated_at: FieldRef<"FuelReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FuelReport findUnique
   */
  export type FuelReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * Filter, which FuelReport to fetch.
     */
    where: FuelReportWhereUniqueInput
  }

  /**
   * FuelReport findUniqueOrThrow
   */
  export type FuelReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * Filter, which FuelReport to fetch.
     */
    where: FuelReportWhereUniqueInput
  }

  /**
   * FuelReport findFirst
   */
  export type FuelReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * Filter, which FuelReport to fetch.
     */
    where?: FuelReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelReports to fetch.
     */
    orderBy?: FuelReportOrderByWithRelationInput | FuelReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FuelReports.
     */
    cursor?: FuelReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FuelReports.
     */
    distinct?: FuelReportScalarFieldEnum | FuelReportScalarFieldEnum[]
  }

  /**
   * FuelReport findFirstOrThrow
   */
  export type FuelReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * Filter, which FuelReport to fetch.
     */
    where?: FuelReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelReports to fetch.
     */
    orderBy?: FuelReportOrderByWithRelationInput | FuelReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FuelReports.
     */
    cursor?: FuelReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FuelReports.
     */
    distinct?: FuelReportScalarFieldEnum | FuelReportScalarFieldEnum[]
  }

  /**
   * FuelReport findMany
   */
  export type FuelReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * Filter, which FuelReports to fetch.
     */
    where?: FuelReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelReports to fetch.
     */
    orderBy?: FuelReportOrderByWithRelationInput | FuelReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FuelReports.
     */
    cursor?: FuelReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelReports.
     */
    skip?: number
    distinct?: FuelReportScalarFieldEnum | FuelReportScalarFieldEnum[]
  }

  /**
   * FuelReport create
   */
  export type FuelReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * The data needed to create a FuelReport.
     */
    data: XOR<FuelReportCreateInput, FuelReportUncheckedCreateInput>
  }

  /**
   * FuelReport createMany
   */
  export type FuelReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FuelReports.
     */
    data: FuelReportCreateManyInput | FuelReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FuelReport createManyAndReturn
   */
  export type FuelReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FuelReports.
     */
    data: FuelReportCreateManyInput | FuelReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FuelReport update
   */
  export type FuelReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * The data needed to update a FuelReport.
     */
    data: XOR<FuelReportUpdateInput, FuelReportUncheckedUpdateInput>
    /**
     * Choose, which FuelReport to update.
     */
    where: FuelReportWhereUniqueInput
  }

  /**
   * FuelReport updateMany
   */
  export type FuelReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FuelReports.
     */
    data: XOR<FuelReportUpdateManyMutationInput, FuelReportUncheckedUpdateManyInput>
    /**
     * Filter which FuelReports to update
     */
    where?: FuelReportWhereInput
  }

  /**
   * FuelReport upsert
   */
  export type FuelReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * The filter to search for the FuelReport to update in case it exists.
     */
    where: FuelReportWhereUniqueInput
    /**
     * In case the FuelReport found by the `where` argument doesn't exist, create a new FuelReport with this data.
     */
    create: XOR<FuelReportCreateInput, FuelReportUncheckedCreateInput>
    /**
     * In case the FuelReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FuelReportUpdateInput, FuelReportUncheckedUpdateInput>
  }

  /**
   * FuelReport delete
   */
  export type FuelReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
    /**
     * Filter which FuelReport to delete.
     */
    where: FuelReportWhereUniqueInput
  }

  /**
   * FuelReport deleteMany
   */
  export type FuelReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FuelReports to delete
     */
    where?: FuelReportWhereInput
  }

  /**
   * FuelReport without action
   */
  export type FuelReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelReport
     */
    select?: FuelReportSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FuelReportScalarFieldEnum: {
    id: 'id',
    station_id: 'station_id',
    fuel_type_id: 'fuel_type_id',
    total_liters_sold: 'total_liters_sold',
    total_amount_sold: 'total_amount_sold',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FuelReportScalarFieldEnum = (typeof FuelReportScalarFieldEnum)[keyof typeof FuelReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type FuelReportWhereInput = {
    AND?: FuelReportWhereInput | FuelReportWhereInput[]
    OR?: FuelReportWhereInput[]
    NOT?: FuelReportWhereInput | FuelReportWhereInput[]
    id?: StringFilter<"FuelReport"> | string
    station_id?: StringFilter<"FuelReport"> | string
    fuel_type_id?: StringFilter<"FuelReport"> | string
    total_liters_sold?: FloatFilter<"FuelReport"> | number
    total_amount_sold?: FloatFilter<"FuelReport"> | number
    created_at?: DateTimeFilter<"FuelReport"> | Date | string
    updated_at?: DateTimeFilter<"FuelReport"> | Date | string
  }

  export type FuelReportOrderByWithRelationInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    total_liters_sold?: SortOrder
    total_amount_sold?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FuelReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FuelReportWhereInput | FuelReportWhereInput[]
    OR?: FuelReportWhereInput[]
    NOT?: FuelReportWhereInput | FuelReportWhereInput[]
    station_id?: StringFilter<"FuelReport"> | string
    fuel_type_id?: StringFilter<"FuelReport"> | string
    total_liters_sold?: FloatFilter<"FuelReport"> | number
    total_amount_sold?: FloatFilter<"FuelReport"> | number
    created_at?: DateTimeFilter<"FuelReport"> | Date | string
    updated_at?: DateTimeFilter<"FuelReport"> | Date | string
  }, "id">

  export type FuelReportOrderByWithAggregationInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    total_liters_sold?: SortOrder
    total_amount_sold?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FuelReportCountOrderByAggregateInput
    _avg?: FuelReportAvgOrderByAggregateInput
    _max?: FuelReportMaxOrderByAggregateInput
    _min?: FuelReportMinOrderByAggregateInput
    _sum?: FuelReportSumOrderByAggregateInput
  }

  export type FuelReportScalarWhereWithAggregatesInput = {
    AND?: FuelReportScalarWhereWithAggregatesInput | FuelReportScalarWhereWithAggregatesInput[]
    OR?: FuelReportScalarWhereWithAggregatesInput[]
    NOT?: FuelReportScalarWhereWithAggregatesInput | FuelReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FuelReport"> | string
    station_id?: StringWithAggregatesFilter<"FuelReport"> | string
    fuel_type_id?: StringWithAggregatesFilter<"FuelReport"> | string
    total_liters_sold?: FloatWithAggregatesFilter<"FuelReport"> | number
    total_amount_sold?: FloatWithAggregatesFilter<"FuelReport"> | number
    created_at?: DateTimeWithAggregatesFilter<"FuelReport"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FuelReport"> | Date | string
  }

  export type FuelReportCreateInput = {
    id?: string
    station_id: string
    fuel_type_id: string
    total_liters_sold: number
    total_amount_sold: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FuelReportUncheckedCreateInput = {
    id?: string
    station_id: string
    fuel_type_id: string
    total_liters_sold: number
    total_amount_sold: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FuelReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    total_liters_sold?: FloatFieldUpdateOperationsInput | number
    total_amount_sold?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    total_liters_sold?: FloatFieldUpdateOperationsInput | number
    total_amount_sold?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelReportCreateManyInput = {
    id?: string
    station_id: string
    fuel_type_id: string
    total_liters_sold: number
    total_amount_sold: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FuelReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    total_liters_sold?: FloatFieldUpdateOperationsInput | number
    total_amount_sold?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    total_liters_sold?: FloatFieldUpdateOperationsInput | number
    total_amount_sold?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FuelReportCountOrderByAggregateInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    total_liters_sold?: SortOrder
    total_amount_sold?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FuelReportAvgOrderByAggregateInput = {
    total_liters_sold?: SortOrder
    total_amount_sold?: SortOrder
  }

  export type FuelReportMaxOrderByAggregateInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    total_liters_sold?: SortOrder
    total_amount_sold?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FuelReportMinOrderByAggregateInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    total_liters_sold?: SortOrder
    total_amount_sold?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FuelReportSumOrderByAggregateInput = {
    total_liters_sold?: SortOrder
    total_amount_sold?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use FuelReportDefaultArgs instead
     */
    export type FuelReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FuelReportDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}