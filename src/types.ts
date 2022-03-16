export type CreateSessionDTO = {
  email: string;
  password: string;
}

type UserData = {
  name: string;
  password: string;
  permissions: string[];
  roles: string[];
}

export type UsersStore = Map<string, UserData>

export type RefreshTokensStore = Map<string, string[]>

export type DecodedToken = {
  sub: string;
}

type ProcessData = {
    id: string,
    processo:string,
    ocorrencia: string,
    alimentador: string,
    situacao: string,
    localidadade: string,
    abertura: string,
    ultimaAcao:string,
    pop: string,
    bo: string,
    condutor: string,
    foto: boolean,
    orcamento: boolean
}


export type Process = Map<string, ProcessData[]>

type LocalidadeData = {
  id: number;
  local:string;
}
export type Localidade = Map<string, LocalidadeData[]>

type SituacaoData ={
  id: number;
  situacao:string;
}

export type Situacao = Map<string, SituacaoData[]>