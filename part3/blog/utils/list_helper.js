const dummy = (blogs)=>{
    return 1
}

const totalLikes = (blogs)=>{
    return blogs.reduce((acc,b)=>{
        return acc+=b.likes
    },0)

}

module.exports = {
    dummy,
    totalLikes
}