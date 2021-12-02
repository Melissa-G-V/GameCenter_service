
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jogos').del()
    .then(function () {
      // Inserts seed entries
      return knex('jogos').insert([
        {jnome: 'KingsQuest', genero_id: 2, descricao:'Kings Quest é um jogo de aventura apontar e clicar desenvolvido pela Sierra On-Line',  foto: 'http://www.retroplace.com/pics/amiga/packshots/29303--kings-quest-quest-for-the-crown.png'},
        {jnome: 'The Legend of Kyrandia', genero_id: 2, descricao:'One é um jogo de aventura de apontar e clicar em 2D e o primeiro jogo da série Fables & Fiends', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWbOlWK2HzyzymyfsAE47PXDu9qsBJB170e-SpIlwvS8bmCzuHiiaGadl8-2Ev_LVe9o8&usqp=CAU'},
        {jnome: 'Professor Layton', genero_id: 7, descricao:'É uma série de jogos eletrônicos de puzzle e aventura para o Nintendo DS e o Nintendo 3DS', foto: 'https://m.media-amazon.com/images/I/61rQeGFjIwL._AC_.jpg'}
      ]);
    });
};
