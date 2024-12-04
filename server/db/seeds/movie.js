export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()

  // Inserts seed entries
  await knex('movies').insert([
    {
      id: 1,
      name: 'War for the Planet of the Apes',
      genre: 'Action e Adventure Movies',
      done: 1,
    },
    { id: 2, name: 'Ferdinand', genre: 'Kids e Family Movies', done: 0 },
    { id: 3, name: 'Kung Fu Panda 3', genre: 'Kids e Family Movies', done: 1 },
  ])
}
