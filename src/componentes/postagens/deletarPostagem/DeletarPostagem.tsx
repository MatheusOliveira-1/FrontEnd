import React, { useEffect, useState } from 'react'
import {Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core"
import './DeletarPostagem.css';
import { useHistory, useParams } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/UserReducer';
import { toast } from 'react-toastify';

function DeletarPostagem() {

    let history = useHistory();
    const { id } = useParams<{id: string}>();
    const token = useSelector < UserState, UserState["tokens"]> (
      (state) => state.tokens
  );
    const [post, setPosts] = useState<Postagem>()

    useEffect(() => {
        if (token == "") {
          toast.error('Você precisa estar logado',{
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'dark',
            progress: undefined
        });
            history.push("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
              'Authorization': token
            }
          })
        }

    async function sim() {
            history.push('/postagens')
            try {
               await deleteId(`/postagens/${id}`, {
                headers: { "Authorization": token }
             
            });
            toast.success('Postagem deletada com sucesso!', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: 'dark',
              progress: undefined
            });
      } catch (error) {
            toast.error('Erro ao deletar postagem', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: 'dark',
              progress: undefined
            })
          }
        }
                 
          function nao() {
            history.push('/home')
          }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
              </Box>
              <Box>
              <Button  onClick={nao} variant="contained" size='large' color="secondary">
                Não
              </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;