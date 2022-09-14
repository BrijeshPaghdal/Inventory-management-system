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
      var server_data = { "prod_id": productId };
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
            url: 'remove-product',
            type: 'POST',
            data: JSON.stringify(server_data),
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
              if (data.Result == 'Success') {
                swal({
                  title: 'Deleted!',
                  text: 'Product Deleted Successfully',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'OK',
                  closeOnConfirm: false,
                  closeOnCancel: false,
                }, function (isConfirm) {
                  if (isConfirm) {
                    location.reload();
                  }
                });
              } else {
                swal(
                  'Cancelled',
                  'Error Occured in deleting Product',
                  'error'
                );
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

  var url1 = window.location.href;
  var url1 = url1.split('/');
  var url1 = url1[url1.length - 2];

  if (url1.split('?').includes('edit-product')) {
    $("#formEdit").on("submit", function (e) {
      e.preventDefault();

      var server_data = {
        "prod_id": document.getElementById("Prod_Id").value,
        "prod_name": document.getElementById("Prod_Name").value,
        "price": document.getElementById("Price").value,
        "quantity": document.getElementById("Avail_Qua").value,
        "old_prod_id": $("#update-product").data('id')
      };

      $.ajax({
        url: "/update-product",
        type: "POST",
        data: JSON.stringify(server_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
          if (data.Result == 'Success') {
            swal({
              title: 'Updated',
              text: 'Product Inserted successfully',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: false,
              closeOnCancel: false,
            }, function (isConfirm) {
              if (isConfirm) {
                window.location.href = "/";
              }
            });

          } else {
            swal("Failed", "Something went wrong", "error");
            $("#formAddProduct").trigger("reset");
          }

        }
      });

    });
  }

  //===================================== ADD PRODUCT =====================================//

  if (url.split('?').includes('add-product')) {
    $("#formAddProduct").on("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(this);

      var server_data = {
        "prod_id": document.getElementById("Prod_Id").value,
        "prod_name": document.getElementById("Prod_Name").value,
        "price": document.getElementById("Price").value,
        "quantity": document.getElementById("Avail_Qua").value
      };

      $.ajax({
        url: "/ajax-add-product",
        type: "POST",
        data: JSON.stringify(server_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
          if (data.Result == 'Success') {
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

  //===================================== Location =====================================//

  if (url.split('?').includes('location')) {

    function showData() {
      location.reload()
    }

    $("#formAddLocation").on("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(this);

      var server_data = { "loc_name": document.getElementById("locname").value };

      $.ajax({
        url: "/ajax-add-location",
        type: "POST",
        data: JSON.stringify(server_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
          if (data.Result == 'Success') {
            swal({
              title: 'Inserted',
              text: 'Location Added successfully',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: false,
              closeOnCancel: false,
            }, function (isConfirm) {
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
    $(function () {
      $(document).on('click', '#btnLocDelete', function (e) {
        e.preventDefault();
        var loc_id = $(this).data('id');
        console.log(loc_id);
        showCancelMessage(loc_id);
      });
    });
    function showCancelMessage(loc_id) {
      var server_data = { "loc_id": loc_id };
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
        function (isConfirm) {
          if (isConfirm) {
            $.ajax({
              url: '/remove-location',
              type: 'POST',
              data: JSON.stringify(server_data),
              contentType: "application/json",
              dataType: 'json',
              success: function (data) {
                if (data.Result == 'Success') {
                  swal({
                    title: 'Deleted!',
                    text: 'Location Deleted Successfully',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'OK',
                    closeOnConfirm: false,
                    closeOnCancel: false,
                  }, function (isConfirm) {
                    if (isConfirm) {
                      location.reload();
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

  // function json(url) {
  //   return fetch(url).then(res => res.json());
  // }
  // var temp = 0;


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