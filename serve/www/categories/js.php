<style>
/*       .select2-container {
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    position: relative;
    vertical-align: middle;
    width: 100%!important;
}
.select2-container--default .select2-selection--single {
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 4px;
    height: 35px;
}*/
.itemz {
    margin: 10px 0 10px 0;
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.add_form_field {
    -webkit-appearance: button;
    background: #35a535;
    color: white;
    padding: 9px;
    font-size: 15px;
    border-radius: 7px;
    border: 1px white solid;
}
.remove_field {
    -webkit-appearance: button;
    color: #007bff;
    background: #d42233!important;
    color: white;
    padding: 9px!important;
    border: 1px white solid;
    font-size: 15px;
    border-radius: 7px;
    background-color: transparent;
}
   </style>
   <script>
   
        /*    console.log( "SELECT2!" );*/
           // $('.itemz').select2(); 

            // $('select').select2();
         
         // CUSTOM DIVS HERE *****/
         
         var this_div;
         
         var car_vehicles_div = '';
         var items_parcels_div = '<div class="row"><hr class="col-md-12"> <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Item</label><select name="ip_itemz[]" class="itemz"></select></div>      <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"> <label>Weight</label><input class="form-control" type="text" name="ip_weight[]" value="" placeholder="Weight (KG)"></div>       <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Dimensions</label><input class="form-control" type="text" name="ip_dimension[]" placeholder="W x H x D (inch/mm/cm)" ></div>  <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Action</label><br><a href="javascript:void(0)" class="remove_field">Remove</a></div></div>';
         var home_removals_div = '<div class="row"><hr class="col-md-12"> <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Item</label><select name="hr_itemz[]" class="itemz"></select></div>      <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"> <label>Weight</label><input class="form-control" type="text" name="hr_weight[]" value="" placeholder="Weight (KG)"></div>      <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Quantity</label><input class="form-control" type="text" name="hr_count[]" value="" placeholder="Quantity"></div> <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Action</label><br><a href="javascript:void(0)" class="remove_field">Remove</a></div></div>';
         var furniture_appliances_div = '<div class="row"><hr class="col-md-12"> <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Item</label><select name="fa_itemz[]" class="itemz"></select></div>      <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"> <label>Weight</label><input class="form-control" type="text" name="fa_weight[]" value="" placeholder="Weight (KG)"></div>       <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Dimensions</label><input class="form-control" type="text" name="fa_dimension[]" placeholder="W x H x D (inch/mm/cm)" ></div>        <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Quantity</label><br><input class="form-control" type="text" name="fa_count[]" value="" placeholder="Quantity"></div> <div class="col-xs-6 col-md-6 col-sm-6"><label>Action</label><a href="javascript:void(0)" class="remove_field">Remove</a></div></div>';
         var motorbikes_div = '';
         var piano_delivery_div = '';
         var freight_forwarder_div = '<div class="row"><hr class="col-md-12"> <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Item</label><select name="ff_itemz[]" class="itemz"></select></div>      <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"> <label>Weight</label><input class="form-control" type="text" name="ff_weight[]" value="" placeholder="Weight (KG)"></div>       <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Dimensions</label><input class="form-control" type="text" name="ff_dimension[]" placeholder="W x H x D (inch/mm/cm)" ></div>  <div class="col-xs-6 col-md-6 col-sm-6" style="margin:10px 0 5px 0"><label>Action</label><br><a href="javascript:void(0)" class="remove_field">Remove</a></div></div>';
         
         var curr_cat = $('#hide_cat').val();
         
                                      
         /********************* IF YOU CANNOT FIND GIVE LIST OF EVEYRTHING ***********************************************/
            var custom=[ ];
               
                                     
         /***************************** MAKES FOR CARS ************/
         if(curr_cat == 'cv'){
             this_div = car_vehicles_div;
                 var obj={
                      Prod:
                          <?php 
                              $this->db->order_by('name', 'asc');
                              $car = $this->db->get_where('category_items', array('category_id'=> 1))->result_array();
                              echo json_encode($car);
                          ?>
                     };
                 
         } 
         
       /***************************** ITEMS AND PARCELS ************/
         if(curr_cat == 'ip'){
             this_div = items_parcels_div;
                 var obj={
                      Prod:
                          <?php 
                              $this->db->order_by('name', 'asc');
                              $car = $this->db->get_where('category_items', array('category_id'=> 4))->result_array();
                              echo json_encode($car);
                          ?>
                      
                     };
                 
         } 
            
        
            
            /*********************** HOME REMOVALS******************/
          if(curr_cat == 'hr'){
             this_div = home_removals_div;
             var obj={
                     Prod:
                          <?php 
                              $this->db->order_by('name', 'asc');
                              $car = $this->db->get_where('category_items', array('category_id'=> 3))->result_array();
                              echo json_encode($car);
                          ?>
                      
                  
         };
        }
        
        
             /*********************** FURNITURE AND APPLIANCESS******************/
          if(curr_cat == 'fa'){
             this_div = furniture_appliances_div;
             var obj={
                  Prod:  <?php 
                              $this->db->order_by('name', 'asc');
                              $car = $this->db->get_where('category_items', array('category_id'=> 2))->result_array();
                              echo json_encode($car);
                          ?>
         };
        }
        
        
          /***************************** MOTORBIKES ************/
         if(curr_cat == 'mb'){
             this_div = motorbikes_div;
                 var obj={
                      Prod: 
                          <?php 
                              $this->db->order_by('name', 'asc');
                              $car = $this->db->get_where('category_items', array('category_id'=> 5))->result_array();
                              echo json_encode($car);
                          ?>
            };
                 
         } 
         
          /***************************** PIANO DELIVERY ************/
         if(curr_cat == 'pd'){
             this_div = piano_delivery_div;
                 var obj={
                      Prod:<?php 
                              $this->db->order_by('name', 'asc');
                              $car = $this->db->get_where('category_items', array('category_id'=> 6))->result_array();
                              echo json_encode($car);
                          ?>
            };
                 
         } 
         
         /***************************** FREIGHT FORWARDER ************/
         if(curr_cat == 'ff'){
             this_div = freight_forwarder_div;
                 var obj={
                      Prod: 
                          <?php 
                              $this->db->order_by('name', 'asc');
                              $car = $this->db->get_where('category_items', array('category_id'=> 7))->result_array();
                              echo json_encode($car);
                          ?>
            };
                 
         } 

        
        
        var max_fields= 10;
        var curent_fields=0;
        
        function add_options(_el){
        	 for(var key in obj.Prod){
        	 	 var text=obj.Prod[key].name;
        	 	 var id=obj.Prod[key].id;
        	 	 var weight=obj.Prod[key].weight;
        	 	 var el =$('<option/>').text(text).val(text).attr('weight',weight);
        	 	 $(_el).append(el);
        	 }
        }
        
        function add_controls(){
            if(curent_fields>=max_fields){
            	alert('max feilds '+max_fields);
            	return false;
            }
                  
                  
                    //************************************** DIV FOR DIFFERENT CAT **********************************/
             $('.container1').append(this_div);
                    
            add_options($('.itemz').last());
            $('.itemz').last().change(function(){
                 select_change(this);
        	});
            
            // REMOVE FIELD        	
    	    $('.remove_field').click(function () {
                    $(this).parent().parent().remove();
                    curent_fields--;
                });
        
        	curent_fields++;
        	$('select').select2();
        }
        
        function select_change(_el){
        	       //var curent_weight=$(_el).children(':selected').attr('weight');
        	       var curent_id=$(_el).children(':selected').val();
        	       var curent_item=$(_el).children(':selected').text();
        	         //set hidden feid value
        	       //$(_el).parent().next().find('[name^="weight"]').val(curent_weight);
        	         //your more code...
        
        	       console.log([curent_id,curent_item]);
        }
        
        function start(){
        	add_options($('.itemz').last());
            $('.itemz').last().change(function(){
                 select_change(this);
        	});
        }
        
        start();
        
        $('.add_form_field').click(function(){
        	add_controls();
        });
        
        // CUSTOM LIST
                          var dataArr = [{id:"Quilt", text:"Quilt"},
                                         {id:"Double Bed", text:"Double Bed"},
                                         {id:"Kingsize Bed", text:"Kingsize Bed"},
                                         {id:"Single Wardrobe",	text:"Single Wardrobe"},
                                         {id:"Chest of Drawers",	text:"Chest of Drawers"},
                                         {id:"Bedside Table",	text:"Bedside Table", "weight":"10"},
                                         {id:"Box of Toys",	text:"Box of Toys"},
                                         {id:"Scooter",	text:"Scooter"},
                                         {id:"Mountain Bike",	text:"Mountain Bike"},
                                         {id:"BMX Bike",	text:"BMX Bike"},
                                         {id:"Mountain Bike",	text:"Mountain Bike"},
                                         {id:"Tumble Dryer",	text:"Tumble Dryer"},
                                         {id:"Boiler",	text:"Boiler"},
                                         {id:"Alloy Wheel",	text:"Alloy Wheel"},
                                         {id:"Display Unit",	text:"Display Unit"},
                                         {id:"Aquarium",	text:"Aquarium"},
                                         {id:"Ant Farm",	text:"Ant Farm"},
                                         {id:"Quad Wardrobe",	text:"Quad Wardrobe"},
                                         {id:"Mountain Bike",	text:"Mountain Bike"},
                                         {id:"Box of Antiques",	text:"Box of Antiques"},
                                         {id:"Mountain Bike",	text:"Mountain Bike"},
                                         {id:"Exhaust Fan",	text:"Exhaust Fan"},
                                         {id:"Ceiling Fan",	text:"Ceiling Fan"},
                                         {id:"Standing Air Condition",	text:"Standing Air Condition"},
                                         {id:"Portable Air Condition",	text:"Portable Air Condition"},
                                         {id:"Split Type Air Condition",	text:"Split Type Air Condition"},
                                         {id:"Mannequin",	text:"Mannequin"},
                                         {id:"Two Seat Sofa", text:"Two Seat Sofa"},
                                         {id:"Three Seat Sofa", text:"Three Seat Sofa"},
                                         {id:"Arm Chair", text:"Arm Chair"},
                                         {id:"Coffee Table", text:"Coffee Table"},
                                         {id:"Small TV(Less than 30inch", text:"Small TV(Less than 30inch)"},
                                         {id:"Large TV(More than 40inch)", text:"Large TV(More than 40inch)"},
                                         {id:"TV Stand", text:"TV Stand"},
                                         {id:"Bookcase", text:"Bookcase"},
                                         {id:"Desk", text:"Desk"},
                                         {id:"Office Chair", text:"Office Chair"},
                                         {id:"Artwork", text:"Artwork"},
                                         {id:"Fridge Freezer", text:"Fridge Freezer"},
                                         {id:"Washing Machine", text:"Washing Machine"},
                                         {id:"Microwave Oven", text:"Microwave Oven"},
                                         {id:"Cooker", text:"Cooker"},
                                         {id:"Dishwasher", text:"Dishwasher"},
                                         {id:"Kitchen Table", text:"Kitchen Table"},
                                         {id:"Dining Chair", text:"Dining Chair"},
                                         {id:"Bin", text:"Bin"},
                                         {id:"Large Mirror", text:"Large Mirror"},
                                         {id:"Small Mirror", text:"Small Mirror"},
                                         {id:"Bathroom Cabinet", text:"Bathroom Cabinet"},
                                         {id:"Bath Tub28", text:"Bath Tub"},
                                         {id:"Large Box", text:"Large Box"},
                                         {id:"Medium Box", text:"Medium Box"},
                                         {id:"Small Box", text:"Small Box"},
                                         {id:"Wardrobe Box", text:"Wardrobe Box"},
                                         {id:"Suitcase", text:"Suitcase"},
                                         {id:"Bag", text:"Bag"},
                                         {id:"Digital Piano", text:"Digital Piano"},
                                         {id:"Upright Piano", text:"Upright Piano"},
                                         {id:"Grand Piano",	text:"Grand Piano"},
                                         {id:"Baby Grand Piano",	text:"Baby Grand Piano"},
                                         {id:"Concert Grand Piano",	text:"Concert Grand Piano"}];
                                         
                    //$('#home_special_item,#furniture_special_item').select2();

                    var options = $('#home_special_item,#furniture_special_item');
                    
                    $.each(dataArr, function() {
                        options.append($("<option />").val(this.id).text(this.text));
                    });
                                         

        </script>