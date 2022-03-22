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
    id: number,
    processo:string,
    ocorrencia: string,
    alimentador: string,
    idSituacao: number,
    situacao?: object,
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

type OrcamentoData = {
  id: number,
  processoId: number,
  tipo: string,
  OS: string,
  descricao: string,
  quantidade: number,
  preco: number,
  total?: number 
}

export type Orcamento = Map<string, OrcamentoData[]>

type TipoAnexoData ={
  id: number;
  value: string;
}

export type TipoAnexo = Map<string, TipoAnexoData[]>

type OrigemAnexoData ={
  id:number;
  value: string;
}

export type OrigemAnexo = Map<string, OrigemAnexoData[]>

type AnexoValorData ={
  id:number;
  tipo: string;
  arquivo: string;
  processoId: number;
}

export type AnexoValorDados = Map<string, AnexoValorData[]>

type TipoCobrancaData ={
  id:number;
  value: string;
}

export type TipoCobranca = Map<string, TipoAnexoData[]>

type SucessoCobrancaData ={
  id:number;
  value: string;
}

export type SucessoCobranca = Map<string, SucessoCobrancaData[]>