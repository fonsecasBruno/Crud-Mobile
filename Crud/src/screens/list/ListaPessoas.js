import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, Button, Card, Dialog, FAB, MD3Colors, Portal} from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function ListaPessoas(navigation, route) {

    const [pessoas, setPessoas] = useState([])
    const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState([false])
    const [pessoaASerExcluida, setPessoaASerExcluida] = useState([null])

    useEffect(() => {
        loadPessoas()
    }, [])

    async function loadPessoas() {
        const response = await AsyncStorage.getItem('pessoas')
        console.log('🚀 ~ file: ListaPessoasAsyncStorage.js:21 ~ loadPessoas ~ response:', response)
        const pessoasStorage = response ? JSON.parse(response) : []
        setPessoas(pessoasStorage)
    }

    const showModal = () => setShowModalExcluirUsuario(true);
    const hideModal = () => setShowModalExcluirUsuario(false);

    async function adicionarPessoas(pessoa) {
        let novaListaPessoas = pessoas
        novaListaPessoas.push(pessoa)
        await AsyncStorage.setItem('pessoa', JSON.stringify(novaListaPessoas));
        setPessoas(novaListaPessoas)
    }

    async function editarPessoa(pessoaAntiga, novosDados) {
        console.log('PESSOA ANTIGA -> ', pessoaAntiga )
        console.log('DADOS NOVOS -> ', novosDados)
    }

    const novaListaPessoas = pessoas.map(pessoa => {
        if (pessoa == pessoaAntiga) {
            return novosDados
        } else {
            return pessoa
        }
    })

    async function excluirPessoa(pessoa) {
        const novaListaPessoas = pessoas.filter(p => p !== pessoa)
        await AsyncStorage.setItem('pessoas', JSON.stringify(novaListaPessoas))
        setPessoas(novaListaPessoas)
        Toast.show({
            type: 'sucess',
            text1: 'Pessoa excluida com sucesso!'
        })
    }

    function handleExcluirPessoa(){
        excluirPessoa(pessoaASerExcluida)
        setPessoaASerExcluida(null)
        hideModal()
    }

  return (
    <View>
    
        <Text variant='titleLarge' style={styles.title}>Lista de Pessoas</Text>

        <FlatList
            style={styles.list}
            data={pessoas}
            renderItem={({ item }) => (
                <Card
                mode='outlined'
                style={styles.card}
                >
                    <View style={{ flex: 1 }}>

                        <Card.Content
                            style={styles.container}
                        >
                            <Text variant='titleMedium'>{item?.nome}</Text>
                            <Text variant='bodyLarge'>{item?.idade}</Text>
                            <Text variant='bodyLarge'>{item?.curso}</Text>
                            <Text variant='bodyLarge'>{item?.matricula}</Text>
                        </Card.Content>

                    </View>

                    <Card.Actions>

                        <Button onPress={() => navigation.push('FormPessoas', { acao: editarPessoa, pessoa: item})}> Editar </Button>

                        <Button onPress={() => {setPessoaASerExcluida(item), showModal()}}> Excluir </Button>

                    </Card.Actions>
                </Card>
            )}
        />

        <FAB
            icon='plus'
            style={styles.fab}
            onPress={() => navigation.push('FormPessoa', { acao: adicionarPessoas})} 
        />

        <Portal>
            <Dialog>

                <Dialog.Title>Atenção</Dialog.Title>

                <Dialog.Content>
                    <Text variant='bodyLarge'>Tem certeza que deseja excluir este usuário?</Text>
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={hideModal}>Voltar</Button>
                    <Button onPress={handleExcluirPessoa}>Tenho certeza!</Button>
                </Dialog.Actions>

            </Dialog>
        </Portal>

    </View>
  )
}

const styles = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
    
title: {
    fontWeight: 'bold',
    margin: 10
},
    
fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
},
    
list: {
    width: '90%',
},
    
card: {
    marginTop: 15
},
    
cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
}
})