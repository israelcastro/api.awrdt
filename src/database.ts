import { Localidade, Process, RefreshTokensStore, Situacao, UsersStore, Origem, SituacaoForm } from "./types"
import { v4 as uuid } from 'uuid'

export const users: UsersStore = new Map()
export const processes: Process = new Map()
export const localidades: Localidade = new Map()
export const situacoes: Situacao = new Map()
export const situacoesForm: SituacaoForm = new Map()
export const origens: Origem = new Map()
export const tokens: RefreshTokensStore = new Map()

export function seedUserStore() {
  users.set('israel.correia@gmail.com', {
    name: 'Israel Castro',
    password: '123456',
    permissions: ['users.list', 'users.create', 'metrics.list'],
    roles: ['administrator']
  })

  users.set('douglas.romano@energisa.com.br', {
    name: 'Douglas Davi',
    password: '123456',
    permissions: ['users.list', 'metrics.list'],
    roles: ['editor']
  })
}
export function seedLocalidade(){
  localidades.set('',[
    
    {id:0, local:"Cuiaba"},
    {id:1, local:"Tocantis"},
    {id:2, local:"Cataguases"},
    
  ])
}

export function seedSituacao(){
  situacoes.set('',[
    
    {id:0, value: 'Novo'},
    {id:1, value: 'Cancelado'},
    {id:2, value: 'Em andamento'},
    {id:3, value: 'Encerrado'},
    
  ])
}

export function seedSituacaoForm(){
  situacoesForm.set('',[   
    
    {id:0, value: 'Em andamento'},
    {id:1, value: 'Encerrado'},
    {id:2, value: 'Concluído'},
    
  ])
}

export function seedOrigem(){
  origens.set('',[
    
    {id:0, value: 'Manual'},
    {id:1, value: 'Automático'},
    
  ])
}

export function seedProcess(){
  processes.set('',
    [
      {
        id: '1',
        processo:'1',
        ocorrencia: '90123456',
        alimentador: '54564',
        situacao: "Novo",
        idSituacao: 0,
        localidadade: "Cuiaba",
        abertura: "10/12/2021",
        ultimaAcao:"08/03/2022",
        pop: true,
        bo: true,
        condutor: true,
        foto: false,
        orcamento: false
      },
      {
        id: '2',
        processo:'2',
        ocorrencia: '90123456',
        alimentador: '54564',
        situacao: "Cancelado",
        idSituacao:1,
        localidadade: "Cuiaba",
        abertura: "10/12/2021",
        ultimaAcao:"08/03/2022",
        pop: false,
        bo: false,
        condutor: true,
        foto: false,
        orcamento: false
      },
      {
      id: '3',
      processo:'3',
      ocorrencia: '90123456',
      alimentador: '54564',
      situacao: "Em andamento",
      idSituacao: 2,
      localidadade: "Cuiaba",
      abertura: "10/12/2021",
      ultimaAcao:"08/03/2022",
      pop: true,
      bo: false,
      condutor: false,
      foto: true,
      orcamento: true
    },
    {
      id: '4',
      processo:'4',
      ocorrencia: '90123456',
      alimentador: '54564',
      situacao: "Novo",
      idSituacao: 0,
      localidadade: "Tocantis",
      abertura: "10/12/2021",
      ultimaAcao:"08/03/2022",
      pop: true,
      bo: true,
      condutor: true,
      foto: false,
      orcamento: false
    }, 
  ]
  )

}
export function createRefreshToken(email: string) {
  const currentUserTokens = tokens.get(email) ?? []
  const refreshToken = uuid()

  tokens.set(email, [...currentUserTokens, refreshToken])

  return refreshToken;
}

export function checkRefreshTokenIsValid(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  return storedRefreshTokens.some(token => token === refreshToken)
}

export function invalidateRefreshToken(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  tokens.set(email, storedRefreshTokens.filter(token => token !== refreshToken));
}
