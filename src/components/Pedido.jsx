import {useState} from 'react'

// Array de objetos contendo o estado inicial do cardápio
const cardapio = [
    {id: 1, nome: "Combo-01", preco: 25.00, disponivel: true, quantidade:0},
    {id: 2, nome: "Combo-02", preco: 30.00, disponivel: true, quantidade:0},
    {id: 3, nome: "Combo-03", preco: 35.00, disponivel: false, quantidade:0},
    {id: 4, nome: "Combo-04", preco: 40.00, disponivel: true, quantidade:0},
];

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
            // MAP: Percorre a lista para criar um novo array sem modificar o original
            prev.map(item=>
                // Ternário: Verifica se o item da iteração atual é o que deve ser alterado
                // Spread(...item) : Adiciona o item a lista atual ou modifica
                // Math.max : Objeto que garante que a quantidade nunca seja menor que 0
                // Item: Retorna o item intacto caso o id não corresponda
               item.id===id ? {...item, quantidade:Math.max(0,item.quantidade + valor)}:item 
            )
        )
    };

    // FILTER: Seleciona apenas os produtos disponíveis e do carrinho
    const produtosDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item => item.quantidade > 0);

    // REDUCE: Calcula a soma dos itens (preço * quantidade) e adiciona a taxa de entrega
    const subTotal = carrinho.reduce((ac,item) => ac + item.preco * item.quantidade,0);
    const total = subTotal > 0 ? subTotal + taxaEntrega : 0;


    // SIMULAÇÃO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADORES ASSÍNCRONOS
    const confirmarPedido = () => {
        setEnviar(true);
        setStatus("Restaurante preparando seu pedido!");

        setTimeout(() => {
            setStatus("Seu pedido saiu para entrega!");
            setEnviar(false);
        }, 5000) // 5 Segundos
        setTimeout(() =>{
            setStatus("Seu pedido foi entregue com sucesso!");
            setEnviar(false);
        }, 10000) // 10 Segundos
    };


  return (
    <div>
        <h1>Cardápio do Restaurante</h1>
        {produtosDisponiveis.map(produto=>(
            <div key={produto.id}>
                <span>{produto.nome}(R${produto.preco.toFixed(2)})</span>
                <div>
                    <button onClick={() => AlterarQuantidade(produto.id, -1)}>-</button>
                    <span>{produto.quantidade}</span>
                    <button onClick={() => AlterarQuantidade(produto.id, +1)}>+</button>
                </div>
            </div>
        ))}

        <hr></hr>
        <h3>Resumo da entrega</h3>
        {carrinho.length === 0 ?(
            <p>Seu carrinho está vazio!</p>
        ):(
            <>
                <ul>
                    {carrinho.map(item =>(
                        <li key={item.id}>
                            {item.quantidade} X {item.nome} - R$ {(item.preco * item.quantidade).toFixed(2)}
                        
                        </li>
                    ))}
                </ul>
                <p>SubTotal: R${subTotal.toFixed(2)}</p>
                      <p>Taxa de Entrega: R$ {taxaEntrega.toFixed(2)}</p>
                      <p>Total: R${subTotal + taxaEntrega}</p>
                <button onClick={confirmarPedido} disabled={enviar}>
                    {enviar ? "Enviando..." : "Confirmar Pedido"}
                </button>
            </>
        )}
        {status && (
            <div>
                <strong>Alerta: </strong>{status}
            </div>
        )}


    </div>
  )
}

export default Pedido
