const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('ámount of likes', () => {
        const blogs= [
            {
                name:"oisdmsdvo",
                likes:5
            },
            {
            name:"gbrrtrtr",
            likes:6
            }
        ]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(11)
    })
  })


  describe('fave blog', () => {
    const blogs= [
        {
            author:"Kalevi",
            name:"ploki1",
            likes:5
        },
        {
        author:"Ritva",
        name:"ploki2",
        likes:6
        },
        {
        author:"Kalevi",
        name:"plogi3",
        likes:18
        },
        {
        author:"Ritva",
        name:"blog4",
        likes:15
        },
        
    ]

    test.only('fave', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            name:"plogi3",
            likes:18
            })
    })
  })
