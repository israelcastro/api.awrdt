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
    
    {id:1, value: 'Novo'},
    {id:2, value: 'Cancelado'},
    {id:3, value: 'Em andamento'},
    {id:4, value: 'Encerrado'},
    
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
  
  let arrProcesses = []
  let rangeYear = ['2019','2020','2021', '2022', '2019']
  let rangeSituation = [1, 2, 3, 4, 1]
  let rangeCondutor = ['João Antonio da Silva', 'Carlos José de Sousa' , 'Manoel Benedito Pereira' , 'Mariana Costa da Silva', 'Pedro Francisco Santana']
  let rangeResponsavel = ['Lucas Linhares','Giovani silva',  'Marcos Silveira' , 'Andressa Rodrigues' , 'Marcia Fazza']
  let rangeOrigem = [0,1,0,1,0]
  let rangeModelo = ['CHEVROLET CORSA','FIAT PUNTO','VOLKSWAGEN GOL', 'HYUNDAI HB20', 'TOYOTA COROLLA']
  let rangeUF = ['MG', 'RJ', 'MT', 'SC', 'CE']
  let rangeAddress = [ ['Palmas' , 'TO'], ['Cuiaba' , 'MT'], ['Belo Horizonte' , 'MG'], ['Cáceres' , 'MT'], ['Rondonópolis' , 'MT']] 
  let rangeBoolean = [true, false, false, true, false]
  let rangeBoolean2 = [false, false, true, true, false]
  let count = 0

  for (let index = 1; index <= 100; index++) {
    
    arrProcesses.push({
      id: '' + index,
      processo: rangeYear[count] + (Math.floor(Math.random() * 99999) + 10000),
      ocorrencia: '' + (Math.floor(Math.random() * 99999999) + 10000000),
      alimentador: '' + (Math.floor(Math.random() * 99999) + 10000),
      situacao: rangeSituation[count],
      localidadade: rangeAddress[count][0],
      abertura: "10/12/2021",
      ultimaAcao:"08/03/2022",
      pop:'' + (Math.floor(Math.random() * 99999) + 10000) ,
      bo: (Math.floor(Math.random() * 99999) + 10000) + '/' + rangeAddress[count][1] ,
      condutor: rangeCondutor[count],
      responsavel: rangeResponsavel[count],
      origem: rangeOrigem[count],
      ultimoAtualizar:rangeResponsavel[count],
      codigoOcorrencia: rangeYear[count] + (Math.floor(Math.random() * 99999) + 10000),
      modelo: rangeModelo[count],
      uf: rangeUF[count],
      foto: rangeBoolean[count],
      orcamento: rangeBoolean2[count]
    })    
    count ++
    
    if(count == 5) { count = 0 }

  }
  
  
  processes.set('',arrProcesses )

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
