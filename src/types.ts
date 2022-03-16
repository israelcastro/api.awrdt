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
    idSituacao: number,
    localidadade: string,
    abertura: string,
    ultimaAcao:string,
    pop: boolean,
    bo: boolean,
    condutor: boolean,
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
  value:string;
}

export type Situacao = Map<string, SituacaoData[]>

type SituacaoFormData ={
  id: number;
  value:string;
}

export type SituacaoForm = Map<string, SituacaoFormData[]>

type OrigemData ={
  id: number;
  value:string;
}

export type Origem = Map<string, OrigemData[]>