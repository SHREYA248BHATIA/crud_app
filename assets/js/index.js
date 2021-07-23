//for custom javascript
// $("#add_user") is the id in model.js
const PORT=process.env.PORT||8080;

$("#add_user").submit(function(event){
    alert("Data Added Successfully!");

})
$("#update_user").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray();//here,this is #update_user
    var data={}
    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']


    })//n will return all the data from the array and i wil return the index from array
    console.log(data);
    
    var request={
        "url":`http://localhost:${PORT}/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }
    //made ajax request above
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})
//deleting data
if(window.location.pathname=="/"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id") //get the current user id from 'this' data attribute

        var request={
            "url":`http://localhost:${PORT}/api/users/${id}`,
            "method":"DELETE",
        }
        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload()
            })

        }
    })

}
