import cors from 'cors';
import express, { NextFunction, Request, response, Response } from 'express';
import jwt from 'jsonwebtoken'
import decode from 'jwt-decode'
import { generateJwtAndRefreshToken } from './auth';
import { auth } from './config';

import { checkRefreshTokenIsValid, users, seedUserStore, invalidateRefreshToken, processes, seedProcess, localidades, seedLocalidade, seedSituacao, situacoes, seedOrigem, origens, seedSituacaoForm, situacoesForm, seedOrcamento} from './database';
import { CreateSessionDTO, DecodedToken } from './types';

const app = express();

app.use(express.json());
app.use(cors())

seedUserStore();
seedProcess();
seedLocalidade();
seedSituacao();
seedOrigem();
seedSituacaoForm();
seedOrcamento();

function checkAuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const decoded = jwt.verify(token as string, auth.secret) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {

    return response 
      .status(401)
      .json({  error: true, code: 'token.expired', message: 'Token invalid.' })
  }
}

function addUserInformationToRequest(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const decoded = decode(token as string) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Invalid token format.' })
  }
}

app.post('/sessions', (request, response) => {
  const { email, password } = request.body as CreateSessionDTO;
  
  const user = users.get(email);

  if (!user || password !== user.password) {
    return response
      .status(401)
      .json({ 
        error: true, 
        message: 'E-mail or password incorrect.'
      });
  }

  const { token, refreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
    name: user.name,
  })

  return response.json({
    token,
    refreshToken,
    name: user.name,
    permissions: user.permissions,
    roles: user.roles,
  });
});

app.post('/refresh', addUserInformationToRequest, (request, response) => {
  const email = request.user;
  const { refreshToken } = request.body;

  const user = users.get(email);

  if (!user) {
    return response
      .status(401)
      .json({ 
        error: true, 
        message: 'User not found.'
      });
  }

  if (!refreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' });
  }

  const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  invalidateRefreshToken(email, refreshToken)

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken: newRefreshToken,
    permissions: user.permissions,
    roles: user.roles,
  });
});

app.get('/me', checkAuthMiddleware, (request, response) => {
  const email = request.user;

  const user = users.get(email);

  if (!user) {
    return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return response.json({
    email,
    name: user.name,
    permissions: user.permissions,
    roles: user.roles,
  })
});

app.get('/processos', (request, response)=> {
  

  let page : any = parseInt(request.query.page as string);
  const limit: any = parseInt(request.query.limit as string);
  const results : any = {}
  const processList: any = processes.get('');
  const situacoesList: any = situacoes.get(''); 

  let arrList : Array<Object> = [] 
  
  results.count = processList?.length

  if(page >= 0) {
    let count = 0
    processList.forEach(function (item : any, indice : any, array : any) {    
      if(indice >= page && count < limit ) {
        item.situacao = situacoesList[item.idSituacao - 1].situacao
        arrList.push(item)
        count = count + 1
      }  
    });    
          
    results.results = arrList

  
    console.log(results.results)
    return response.json(results);
  }
  else {
    results.results = processList

    return response.json(results);

    
  }

})

app.get('/processlist', (request, response)=>{
  
  let page : any = parseInt(request.query.page as string);
  const limit: any = parseInt(request.query.limit as string);
  const results : any = {}
  const processList: any = processes.get('');

  let arrList : Array<Object> = []

   

  if(page >= 0) {
    let count = 0
    processList.forEach(function (item : any, indice : any, array : any) {    
      if(indice >= page && count < limit ) {
        arrList.push(item)
        count = count + 1
      }  
    });
    
    
    results.count = processList?.length  
    results.results = arrList

    console.log(results.results)
    return response.json(results);
  } else {
    results.results = processList
    return response.json(results);
  }
  
})

app.get('/processos/:process', (request, response) => {
  
  const processId = request.params.process;
  let processeList: any = processes.get(''); 
  
  for (let process of processeList) {
    if (process.id === processId) {
        response.json(process);
        return; 
    }
  }

  response.status(404).send('Processo não encontrado'); 

})

app.get('/localidades',(request, response)=>{
  const locais = localidades.get('');
  return response.json(locais);
})

app.get('/situacoes',(request, response)=>{
  const situacao = situacoes.get('');
  return response.json(situacao)
})

app.get('/origens',(request, response)=>{
  const origem = origens.get('');
  return response.json(origem)
})

app.listen(3333);