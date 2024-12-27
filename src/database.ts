import { Localidade, Process, RefreshTokensStore, Situacao, UsersStore, Origem, SituacaoForm, Orcamento, TipoAnexo, OrigemAnexo, AnexoValorDados, Obra, TipoCobranca, SucessoCobranca, Negociacao } from "./types"
import { v4 as uuid } from 'uuid'

export const users: UsersStore = new Map()
export const processes: Process = new Map()
export const localidades: Localidade = new Map()
export const situacoes: Situacao = new Map()
export const situacoesForm: SituacaoForm = new Map()
export const origens: Origem = new Map()
export const orcamentos: Orcamento = new Map()
export const obras: Obra = new Map()
export const tipoAnexos: TipoAnexo = new Map()
export const origemAnexos: OrigemAnexo = new Map()
export const anexoValorDados: AnexoValorDados = new Map()
export const tipoCobrancas: TipoCobranca = new Map()
export const sucessoCobrancas: SucessoCobranca = new Map()
export const tokens: RefreshTokensStore = new Map()
export const necociacoes: Negociacao = new Map()


export function seedUserStore() {
  users.set('israel.correia@gmail.com', {
    name: 'Israel Castro',
    password: '123456',
    permissions: ['users.list', 'users.create', 'metrics.list'],
    roles: ['administrator']
  })

  users.set('', {
    name: 'Douglas Davi',
    password: '123456',
    permissions: ['users.list', 'metrics.list'],
    roles: ['editor']
  })
}
export function seedLocalidade(){
  localidades.set('',[
    
    {id:1, local:"Cuiaba"},
    {id:2, local:"Tocantis"},
    {id:3, local:"Cataguases"},
    
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
    {id:1, value: 'Automático'}
    
  ])
}

export function seedTipoCobranca(){
  tipoCobrancas.set('',[
    
    {id:1, value: 'Email'},
    {id:2, value: 'Contato Telefonico'},
    {id:3, value: 'Outros'}
    
  ])
}

export function seedSucessoCobranca(){
  sucessoCobrancas.set('',[
    {id:1, value: 'Sim'},
    {id:2, value: 'Não'}
  ])
}
export function seedTipoAnexo(){
  tipoAnexos.set('',[
    {id:0, value: 'Boletim de Ocorrência'},
    {id:1, value: 'Script (POP-007)'},
    {id:2, value: 'Termo de Confissão de Dívida (assinado)'},
    {id:3, value: 'Carta Extradicial (assinado)'},
    {id:4, value: 'Outros'}
  ])
}

export function seedOrigemAnexo(){
  origemAnexos.set('',[
    {id:1, value: 'OS Manutenção'},
    {id:2, value: 'OS Tecnica'},
    {id:3, value: 'OSs da Obra'},
    {id:4, value: 'Local de rede/computador'}
  ])
}

export function seedAnexoValor(){
  
  let arrAnexos = []
  let count = 0
  let processoId = 1
  const rangeAnexo = [['POP 00075632/2020', 'Script (POP-007)'],['BO 2020/236985', 'Boletim de Ocorrência'],['Termo confissão.pdf','Termo de Confissão de Dívida (assinado)'], ['Carta extrajudicial.pdf','Carta Extradicial (assinado)'], ['Obra.PNG', 'Outros']]

  for (let index = 1; index <= 50; index++) {
    arrAnexos.push({
      id: index, 
      tipo: rangeAnexo[count][1], 
      arquivo: rangeAnexo[count][0],
      processoId : processoId
    })

    count ++    
    if(count == 5) { count = 0; processoId++ }
  }
  
  anexoValorDados.set('',arrAnexos)
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
      id: index,
      processo: rangeYear[count] + (Math.floor(Math.random() * 99999) + 10000),
      ocorrencia: '' + (Math.floor(Math.random() * 99999999) + 10000000),
      alimentador: '' + (Math.floor(Math.random() * 99999) + 10000),
      idSituacao: rangeSituation[count],
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

export function seedOrcamento(){
  
  const arrOrcamento = []
  const item: any = [
    ['POSTE CONCR DUPL T 10m 300DAN',2377.31], ['ISOLADOR PILAR PORC VERT S/GRP',91.71],
    ['CRUZETA POSTE FIBRA DE VIDRO',112.95], ['PINO NORMAL AC 344MM 35X45MM',52.59],
    ['OPER CHAVE FUS AM E FC EMERG L',80], ['ABRIR CAVA EM TERRA NORMAL',80],
    ['DESAT RAMAL SERVICO MONOFASICO',115], ['CONFECC BASE CON TOTAL/SOLO',48],
    ['DESAT EST SEC EM REDE',28], ['NIVELAR CONF BT P/FASE LM',23] 
  ] 
  const rangeYear = ['2019','2020','2021', '2022', '2019','2019','2020','2021', '2022', '2019' ]
  const qtd = [1,3,2,1,4,1,3,2,1,4]
  let count = 0
  let processoId = 1
  let obraId = 1

  for (let index = 1; index <= 100; index++) {
    arrOrcamento.push({
      id : index,
      obraId: '0000' + obraId,
      processoId : processoId,
      tipo : 'Obra: '  + (Math.floor(Math.random() * 99999) + 10000), 
      OS: 'EMT-LDVL01 ' + (Math.floor(Math.random() * 99999) + 10000) + '/' + rangeYear[count],
      descricao: '' + item[count][0],
      preco : item[count][1],
      quantidade: qtd[count]
    })

    count ++ 
    if(count == 5) { obraId++ }   
    if(count == 10) { count = 0; processoId++; }
  }
  
  orcamentos.set('', arrOrcamento)
}

export function seedObra() {
  
  let arrObras = []
  const item: any = [
    ['POSTE CONCR DUPL T 10m 300DAN',2377.31], ['ISOLADOR PILAR PORC VERT S/GRP',91.71],
    ['CRUZETA POSTE FIBRA DE VIDRO',112.95], ['PINO NORMAL AC 344MM 35X45MM',52.59],
    ['OPER CHAVE FUS AM E FC EMERG L',80], ['ABRIR CAVA EM TERRA NORMAL',80],
    ['DESAT RAMAL SERVICO MONOFASICO',115], ['CONFECC BASE CON TOTAL/SOLO',48],
    ['DESAT EST SEC EM REDE',28], ['NIVELAR CONF BT P/FASE LM',23] 
  ] 
  const rangeYear = ['2019','2020','2021', '2022', '2019','2019','2020','2021', '2022', '2019' ]
  const qtd = [1,3,2,1,4,1,3,2,1,4]
  let count = 0

  for (let index = 1; index <= 10; index++) {
    arrObras.push(
      {
        tipo : 'Obra: '  + (Math.floor(Math.random() * 99999) + 10000), 
        OS: 'EMT-LDVL01 ' + (Math.floor(Math.random() * 99999) + 10000) + '/' + rangeYear[count],
        descricao: '' + item[count][0],
        preco : item[count][1],
        quantidade: qtd[count]
      }
    )
    count ++
    if(count == 10) { count = 0 }
  }

  obras.set('', [
    {
      obraId : '00001',
      processoId: 1,
      total : 5538,
      subtotal: 1000,
      items : arrObras      
    },
    {
      obraId : '00002',
      processoId: 1,
      total : 5538,
      subtotal: 1000,
      items : arrObras
    },
    {
      obraId : '00003',
      processoId: 1,
      total : 8349,
      subtotal: 1000,
      items : arrObras
    },
  ])
}

export function seedNegociacao() {
  const negociacao = [{
    id: 1,
    tipo: 'RED',
    idProcesso: 1,
    totalParcelas: 3,
    totalOrcado: 6000,
    totalPago: 4000,
    totalPendente: 2000,
    cobranca: [
      {
        id : 1,
        tipo: '2022-236598 (RED 55)',
        CDC: '6-993022',
        dtVencimento : '15/01/2022',
        valor: 2000,
        situacao: 'Pago',
        parcela: {},
      },
      {
        id : 2,
        tipo: '2022-296318 (RED 55)',
        CDC: '6-993022',
        dtVencimento : '15/02/2021',
        valor: 2000,
        situacao: 'Pago',
        parcela: {},
      },
      {
        id : 3,
        tipo: '2022-966598 (RED 55)',
        CDC: '6-993022',
        dtVencimento : '15/03/2021',
        valor: 2000,
        situacao: 'Negociado',
        parcela: {
          id: 1,
          qtdParcelas: 3,
          parcelas: [
            {
              id : 1,
              tipo: 'Fatura 6-993022 01',
              CDC: '6-993022',
              dtVencimento : '22/04/2021',
              valor: 1000,
              situacao: 'Pago',
            },
            {
              id : 2,
              tipo: 'Fatura 6-993022 02',
              CDC: '6-993022',
              dtVencimento : '22/04/2021',
              valor: 1000,
              situacao: 'Pendente',
            },
            {
              id : 3,
              tipo: 'Fatura 6-993022 03',
              CDC: '6-993022',
              dtVencimento : '22/04/2021',
              valor: 1000,
              situacao: 'Pendente',
            }
          ]
        } 
      },
    ]
  }]

  necociacoes.set('', negociacao)


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
