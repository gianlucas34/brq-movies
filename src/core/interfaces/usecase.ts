export interface IUseCase<Return, Params> {
  execute(params: Params): Promise<Return>
}

export interface INoParams {}
