import { Process, RefreshTokensStore, UsersStore } from "./types"
import { v4 as uuid } from 'uuid'

export const users: UsersStore = new Map()
export const processes: Process = new Map()
export const tokens: RefreshTokensStore = new Map()

export function seedUserStore() {
  users.set('israel.correia@gmail.com', {
    password: '123456',
    permissions: ['users.list', 'users.create', 'metrics.list'],
    roles: ['administrator']
  })

  users.set('douglas.romano@energisa.com.br', {
    password: '123456',
    permissions: ['users.list', 'metrics.list'],
    roles: ['editor']
  })
}

export function seedProcess(){
  processes.set('',
    [
      {
        processo:'1',
        ocorrencia: '90123456',
        alimentador: '54564',
        situacao: "Novo",
        localidadade: "Cuiaba",
        abertura: "10/12/2021",
        ultimaAcao:"08/03/2022",
        pop: "true",
        bo: true,
        condutor: true,
        foto: false,
        orcamento: false
      },
      {
        processo:'2',
        ocorrencia: '90123456',
        alimentador: '54564',
        situacao: "Cancelado",
        localidadade: "Cuiaba",
        abertura: "10/12/2021",
        ultimaAcao:"08/03/2022",
        pop: "false",
        bo: false,
        condutor: true,
        foto: false,
        orcamento: false
      },
      {
      processo:'3',
      ocorrencia: '90123456',
      alimentador: '54564',
      situacao: "Em andamento",
      localidadade: "Cuiaba",
      abertura: "10/12/2021",
      ultimaAcao:"08/03/2022",
      pop: "true",
      bo: false,
      condutor: false,
      foto: true,
      orcamento: true
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
