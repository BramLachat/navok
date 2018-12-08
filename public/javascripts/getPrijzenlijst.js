function getPrijzenlijst(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("prijzen").innerHTML=this.responseText;
        }
    };
    xhttp.open("GET","prijzenlijst.txt",true);
    xhttp.send();

}