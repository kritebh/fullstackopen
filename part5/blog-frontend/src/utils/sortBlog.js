const compare = (first,second)=>{
    return first.likes<second.likes?1:-1
}

const sortBlogBasedOnLike = (blogs)=>{
    blogs.sort(compare)
}

export default sortBlogBasedOnLike