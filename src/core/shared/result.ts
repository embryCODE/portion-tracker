interface ConstructorParams<T> {
  isSuccess: boolean
  error?: Error
  value?: T
}

export class Result<T = never> {
  public isSuccess: boolean
  public isFailure: boolean
  public error: Error | undefined
  private readonly _value: T | undefined

  public constructor({ isSuccess, error, value }: ConstructorParams<T>) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      )
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      )
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess

    this.error = error
    this._value = value

    Object.freeze(this)
  }

  public getValue() {
    if (!this.isSuccess) {
      console.error(this.error)
      throw new Error(
        "Can't get the value of an error result. Use 'getError' instead."
      )
    }

    return this._value as T // Can't be undefined
  }

  public getError() {
    if (this.isSuccess) {
      throw new Error(
        "Can't get the error value of a successful result. Use 'getValue' instead."
      )
    }

    return this.error as Error
  }

  public static ok<U = never>(value?: U): Result<U> {
    return new Result<U>({ isSuccess: true, value })
  }

  public static fail<U = never>(error: Error): Result<U> {
    return new Result<U>({ isSuccess: false, error })
  }

  // noinspection JSUnusedGlobalSymbols
  public static combine(results: Result<unknown>[]): Result<unknown> {
    for (const result of results) {
      if (result.isFailure) return result
    }

    return Result.ok()
  }
}
