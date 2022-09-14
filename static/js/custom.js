$(document).ready(function () {

  var geocoder;
  var map;

  var url = window.location.href;
  var url = url.split('/');
  var url = url[url.length - 1];

  //===================================== PRODUCT LIST =====================================//

  if (url.split('?').includes('')) {
    ('use strict');
    $(function () {
      $(document).on('click', '#btnProdDelete', function (e) {
        e.preventDefault();
        var type = $(this).data('type');
        var productId = $(this).data('id');
        if (type === 'confirm') {
          showCancelMessage(productId);
        }
      });
    });

    function showCancelMessage(productId) {
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this product detail!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
          $.ajax({
            url: './ajax/ajax-delete-product.php',
            type: 'POST',
            data: {
              prod_id: productId
            },
            success: function (data) {
              if (data == 1) {
                swal("Deleted!", "Your product has been deleted.", "success");
                showData();
              } else if (data == 2) {
                swal("Cancelled", "Error Occured in deleting product", "error");
              }
            }
          });
        } else {
          swal("Cancelled", "Product is Not Deleted", "warning");
        }
      });
    }


  }

  //===================================== Edit PRODUCT =====================================//
//
//  if (url.split('?').includes('edit-product.php')) {
//    $(document).on("change", "#Cate_Name", function (e) {
//      val = this.value;
//      getSubCate(val);
//    });
//    if ($("#Sub_C_Name").val() == null) {
//      getSubCate($("#Cate_Name").val());
//    }
//
//    function getSubCate(val1) {
//      $.ajax({
//        url: "ajax/ajax-select-sub-cate.php",
//        type: "POST",
//        data: {
//          cate_name: val1
//        },
//        success: function (data) {
//          $("#Sub_C_Name").html(data);
//        }
//      });
//    }
//
//    $("#formEdit").on("submit", function (e) {
//
//      e.preventDefault();
//
//      var formData = new FormData(this);
//
//      $.ajax({
//
//        url: "./ajax/ajax-edit-product.php",
//        type: "POST",
//        data: formData,
//        contentType: false,
//        processData: false,
//        success: function (data) {
//          if (data == 1) {
//            swal({
//              title: "Updated!",
//              text: "Your product updated succesfully.",
//              type: "success",
//              showCancelButton: false,
//              confirmButtonColor: "#DD6B55",
//              confirmButtonText: "ok",
//              closeOnConfirm: false,
//              closeOnCancel: false
//            }, function (isConfirm) {
//              if (isConfirm) {
//                document.location.href = "http://localhost/phpproj/EasyGift/vendor/product-list.php";
//              }
//            });
//          } else if (data == 2) {
//            swal("Cancelled", "Image upload failed", "warning");
//          } else if (data == 3) {
//            swal("Cancelled", "Image upload failed", "warning");
//          } else {
//            swal("Cancelled", "Product Update Failed!!", "warning");
//          }
//        }
//      });
//
//    });
//  }

  //===================================== ADD PRODUCT =====================================//

  if (url.split('?').includes('add-product')) {
    $("#formAddProduct").on("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(this);

        var server_data = {"prod_id": document.getElementById("Prod_Id").value,
          "prod_name": document.getElementById("Prod_Name").value,
          "price": document.getElementById("Price").value,
          "quantity": document.getElementById("Avail_Qua").value};

          $.ajax({
            url: "/ajax-add-product",
            type: "POST",
            data: JSON.stringify(server_data),
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
              if (data.Result == 'Success' ) {
                swal("Inserted", "Product Inserted successfully", "success");
                $("#formAddProduct").trigger("reset");
              } else {
                swal("Failed", "Something went wrong", "error");
                $("#formAddProduct").trigger("reset");

              }

            }
          });

    });

  }

  //===================================== ORDER =====================================//

  if (url.split('?').includes('location')) {

    function showData() {
      location.reload()
    }

     $("#formAddLocation").on("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(this);

        var server_data = {"loc_name": document.getElementById("locname").value};

          $.ajax({
            url: "/ajax-add-location",
            type: "POST",
            data: JSON.stringify(server_data),
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
              if (data.Result == 'Success' ) {
                swal({
                  title: 'Inserted',
                  text: 'Location Added successfully',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'OK',
                  closeOnConfirm: false,
                  closeOnCancel: false,
                },function(isConfirm){
                 if (isConfirm) {
                    $("#formAddLocation").trigger("reset");
                    showData();
                 }
                });


              } else {
                swal("Failed", "Something went wrong", "error");
              }
            }
          });

    });

//======================= Remove location =============================
    ('use strict');
    $(function() {
      $(document).on('click', '#btnLocDelete', function(e) {
        e.preventDefault();
        var type = $(this).data('type');
        var loc_id = $(this).data('id');
        console.log(loc_id)
        if (type === 'confirm') {
          showCancelMessage(loc_id);
        }
      });
    });
    function showCancelMessage(loc_id) {
    var server_data = {"loc_id": loc_id}
      swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this Location detail!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          closeOnConfirm: false,
          closeOnCancel: false,
        },
        function(isConfirm) {
          if (isConfirm) {
            $.ajax({
             url: '/remove-location',
                type: 'POST',
                data: JSON.stringify(server_data),
                contentType: "application/json",
                dataType: 'json',
                  success: function(data) {
                    if (data.Result == 'Success' ) {
                      swal({
                          title: 'Deleted!',
                          text: 'Location Deleted Successfully',
                          type: 'success',
                          showCancelButton: false,
                          confirmButtonColor: '#DD6B55',
                          confirmButtonText: 'OK',
                          closeOnConfirm: false,
                          closeOnCancel: false,
                        },function(isConfirm){
                         if (isConfirm) {
                            showData();
                         }
                        });
                    } else {
                      swal(
                        'Cancelled',
                        'Error Occured in deleting Location',
                        'error'
                      );
                    }
                  }
             });
          } else {
            swal('Cancelled', 'Location is Not Deleted', 'error');
          }
        });
    }
  }


  //--------------------------functions -----------------------------------//

  function json(url) {
    return fetch(url).then(res => res.json());
  }
  var temp = 0;





  function getQuickProductView() {
    $.ajax({
      url: "ajax/ajax-quick-product-view.php",
      type: "POST",
      success: function (data) {
        $('#quick-product-view').html(data);
      }
    });
  }


  function checkConfirmPassswd(password1, password2) {
    if (password1 == '') {
      return 1;
    }
    // If confirm password not entered
    else if (password2 == '') {
      return 2;
    }
    // If Not same return False.
    else if (password1 !== password2) {
      return 3;
    }
    // If same return True.
    else {
      return 4;
    }
  }


});