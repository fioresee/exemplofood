import {useState} from 'react'

// Array de objetos contendo o estado inicial do cardápio
const cardapio = [
    {id: 1, nome: "Combo-01", preco: 25.00, disponivel: true, quantidade:0},
    {id: 2, nome: "Combo-02", preco: 30.00, disponivel: true, quantidade:0},
    {id: 3, nome: "Combo-03", preco: 35.00, disponivel: false, quantidade:0},
    {id: 4, nome: "Combo-04", preco: 40.00, disponivel: true, quantidade:0},
]

const Pedido = () => {

    // HOOK - useState - Manipula o estado da variável
    // Exemplo: Vai gerenciar a lista de itens
    const [items,setItems] = useState(cardapio);
    const [status,setStatus] = useState("");
    const [enviar,setEnviar] = useState(false);

    // Valor fixo adicionado ao total quando tiver itens no carrinho
    const taxaEntrega = 5.00;

    //Função que altera a quantidade do pedido
    const AlterarQuantidade = (id, valor) => {
        setItems(prev=>
            // Map: Percorre a lista para criar um novo array sem modificar o original
            prev.map(item=>
                // Ternário: Verifica se o item da iteração atual é o que deve ser alterado
                // Spread(...item) : Adiciona o item a lista atual ou modifica
                // Math.max : Objeto que garante que a quantidade nunca seja menor que 0
                // Item: Retorna o item intacto caso o id não corresponda.
               item.id===id ? {...item, quantidade:Math.max(0,item.quantidade + valor)}:item 
            )
        )
    }



  return (
    <>
      
    </>
  )
}

export default Pedido
