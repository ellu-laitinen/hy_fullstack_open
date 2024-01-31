const dummy = (blogs) => {
   return 1
  }

const totalLikes = (blogs) => {

    const likes = blogs.reduce((sum, item) => {
        return sum += item.likes
    }, 0)
    return likes

}

const favoriteBlog = (blogs) => {
    let fave =blogs[0]
    console.log("FAVE NOW",fave)
    blogs.map(b =>{
        if(b.likes > fave.likes){
            fave = b
        }
    })
    console.log("FAVE in the end ",fave)
    return fave

}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }