function navbar(){
    return `      <a href="#"><img src="image/navbar_logo.jpg" class="logo" alt="" /></a>
    <div class="form">
        <input type="text" placeholder="Search any items" />
        <button class="normal">Search</button>
    </div>
    <div>
        <ul id="navbar">
            <li><a class="active" href="index.html">Home</a></li>
            <li><a href="sign up.html">Sign up</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li id="lg-bag">
                <a href="cart.html"><i class="fa-solid fa-cart-shopping fa-bounce" style="color: #dfab62;"></i></a>
                <a href="#" id="close"><i class="fa-regular fa-circle-xmark"></i></a>
            </li>
        </ul>
    </div>`
}
export default navbar;
