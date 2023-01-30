const hideSection = (event, parents = 0) => {
   switch (parents) {
      case 1:
         event.target.parentNode.classList.add("forceDNone")
         break;
      case 2:
         event.target.parentNode.parentNode.classList.add("forceDNone")
         break;
      case 3:
         event.target.parentNode.parentNode.parentNode.classList.add("forceDNone")
         break;

      default:
         event.target.classList.add("forceDNone")
         break;
   }


}