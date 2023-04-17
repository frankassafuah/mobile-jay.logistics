const ajax_base = "https://jaylogistic.com/api/integration/v1/index.php/";
const image_base = "https://jaylogistic.com/app/uploads/profile/";
const pageBook = Vue.createApp({
  data() {
    return {
      logged_in_number: null,
      thisDevice: null,
      profile_url: ajax_base + "manager/profile",
      make_url: ajax_base + "information/carMake",
      model_url: ajax_base + "information/carModel",
      price_url: ajax_base + "price/gen",
      submit_url: ajax_base + "order/submit",
      //CAT URL
      fa_url: ajax_base + "information/furnitureAppliance",
      ip_url: ajax_base + "information/itemParcel",
      hr_url: ajax_base + "information/homeRemoval",
      mb_url: ajax_base + "information/motorbike",
      pd_url: ajax_base + "information/piano",
      ff_url: ajax_base + "information/freight",
      cvcurrentGroup: 1,
      cvmaxGroup: 10,
      facurrentGroup: 1,
      famaxGroup: 10,
      hrmaxGroup: 10,
      hrcurrentGroup: 1,
      ipmaxGroup: 10,
      ipcurrentGroup: 1,
      mbcurrentGroup: 1,
      mbmaxGroup: 10,
      pdcurrentGroup: 1,
      pdmaxGroup: 10,
      ffcurrentGroup: null,
      ffmaxGroup: null,
      //  ------------
      
      carMakes: [],
      carModels: [],
      cvDuplicates: [],
      faDuplicates: [],
      hrDuplicates: [],
      furnitureAppliances: [],
      itemParcels: [],
      ipDuplicates: [],
      motorbikes: [],
      mbDuplicates: [],
      pianoDeliveries: [],
      pdDuplicates: [],
      freightForwards: [],
      ffDuplicates: [],
      homeRemovals: [],
      
      form: {
        client_id: "",
        booking_category: "",
        booking_car_manufacturer: "",
        booking_car_model: "",
        booking_moving_from: "",
        booking_moving_to: "",
        booking_date: "",
        booking_distance: "",
        booking_estimated_duration: "",
        booking_time_of_pickup: "",
        booking_hire_duration: "2",
        booking_men_needed: "1",
        booking_floor_pickup: "",
        booking_floor_deliver: "",
        booking_car_registration: "",
        booking_car_operational: "",
        booking_fa_item: "",
        booking_fa_item_search: "",
        booking_fa_weight: "",
        booking_fa_dimensions: "",
        booking_fa_quantity: "1",
        booking_fa_other_description: "",
        booking_fa_url: "",
        booking_hr_item: "",
        booking_hr_item_search: "",
        booking_hr_weight: "",
        booking_hr_dimensions: "",
        booking_hr_quantity: "1",
        booking_hr_other_description: "",
        booking_ip_item: "",
      },
    };
  },

  methods: {
    purgeData() {
      window.localStorage.setItem("JayLogisticGen", "");
      window.localStorage.setItem("JayLogisticStat", 0);
    },
    profile(logged_in_number) {
      if (logged_in_number) {
        try {
          const response = axios.post(`${this.profile_url}`, {
            number: logged_in_number,
          });
          if (response && response.usr.id.length > 0) {
            this.client_id = response.usr.id;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else {
        swal("Something went wrong, please try again.");
      }
    },

    //add more cv fields group
    cvaddMore() {
      this.cvcurrentGroup++;
      if (this.cvcurrentGroup < 10) {
        this.cvDuplicates.push(this.cvcurrentGroup);
      } else {
        swal("Maximum " + this.cvmaxGroup + " items allowed.");
      }
    },
    //add more fa fields group
    faaddMore() {
      this.facurrentGroup++;
      if (this.facurrentGroup < 10) {
        this.faDuplicates.push(this.facurrentGroup);
      } else {
        swal("Maximum " + this.famaxGroup + " items allowed.");
      }
    },
    //add more hr fields group
    hraddMore() {
      this.hrcurrentGroup++;
      if (this.hrcurrentGroup < 10) {
        this.hrDuplicates.push(this.hrcurrentGroup);
      } else {
        swal("Maximum " + this.hrmaxGroup + " items allowed.");
      }
    },
    //add more ip fields group
    ipaddMore() {
      this.ipcurrentGroup++;
      if (this.ipcurrentGroup < 10) {
        this.ipDuplicates.push(this.ipcurrentGroup);
      } else {
        swal("Maximum " + this.ipmaxGroup + " items allowed.");
      }
    },
    //add more mb fields group
    mbaddMore() {
      this.mbcurrentGroup++;
      if (this.mbcurrentGroup < 10) {
        this.mbDuplicates.push(this.mbcurrentGroup);
      } else {
        swal("Maximum " + this.mbmaxGroup + " items allowed.");
      }
    },
    //add more pd fields group
    pdaddMore() {
      this.pdcurrentGroup++;
      if (this.pdcurrentGroup < 10) {
        this.pdDuplicates.push(this.pdcurrentGroup);
      } else {
        swal("Maximum " + this.pdmaxGroup + " items allowed.");
      }
    },
    //add more ff fields group
    ffaddMore() {
      this.ffcurrentGroup++;
      if (this.ffcurrentGroup < 10) {
        this.ffDuplicates.push(this.ffcurrentGroup);
      } else {
        swal("Maximum " + this.ffmaxGroup + " items allowed.");
      }
    },

    handleBookingCategoryChange() {
      swal("Information", "Categories Loading", "info");
      // AJAX FOR CATEGORIES
      if (this.booking_category == "cv") {
        try {
          const response = axios.post(`${this.make_url}`);
          if (response) {
            this.carMakes = response.data;

            // POPULATE MODEL
            var ini_val = this.booking_car_manufacturer;
            $("#booking_car_model").val(); //val = 1;
            try {
              const response = axios.post(`${this.model_url}/${ini_val}`);
              if (response) {
                this.carModels = response.data;
              }
            } catch (error) {
              swal("Something went wrong, please try again.");
            }
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.booking_category == "fa") {
        /** FURNITURE AND APPLICANCES **/
        try {
          const response = axios.post(`${this.fa_url}`);
          if (response) {
            this.furnitureAppliances = response.data;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.booking_category == "hr") {
        /** HOME REMOVALS **/
        try {
          const response = axios.post(`${this.hr_url}`);
          if (response) {
            this.homeRemovals = response.data;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.booking_category == "ip") {
        /** ITEMS AND PARCELS**/
        try {
          const response = axios.post(`${this.ip_url}`);
          if (response) {
            this.itemParcels = response.data;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.booking_category == "mb") {
        /** MOTORBIKE**/
        try {
          const response = axios.post(`${this.mb_url}`);
          if (response) {
            this.motorbikes = response.data;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.booking_category == "pd") {
        /** PIANO DELIVERY**/
        try {
          const response = axios.post(`${this.pd_url}`);
          if (response) {
            this.pianoDeliveries = response.data;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else {
        /** FREIGHT FORWARD **/
        try {
          const response = axios.post(`${this.ff_url}`);
          if (response) {
            this.freightForwards = response.data;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      }

      //END OF ALL PARENT AJAX FROM CATEGORY
    },
    // CARS AND VEHICLES
    /** MODEL  AND MANUFACUER FOR CARS AND VEHICLES**/

    handleBookingCarManufacturerChange() {
      //var make_val = 1;

      var make_val = this.booking_car_manufacturer;
      if (make_val) {
        try {
          const response = axios.post(`${this.model_url}/${make_val}`);
          if (response) {
            this.carModels = response.data;
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      }

      // END AJAX
    },

    removeItem(name) {
      if (name == "cv") {
        this.cvDuplicates.pop();
      } else if ((name = "fa")) {
        this.faDuplicates.pop();
      } else if ((name = "hr")) {
        this.hrDuplicates.pop();
      } else if ((name = "ip")) {
        this.ipDuplicates.pop();
      } else if ((name = "mb")) {
        this.mbDuplicates.pop();
      } else if ((name = "pd")) {
        this.pdDuplicates.pop();
      } else {
        this.ffDuplicates.pop();
      }
      swal("Success!", "Item Removed", "success");
    },
    otherDescriptionDisplay(value) {
      //console.log(other_val);
      if (value == "Other" || value == "other") {
        swal(
          "Information!",
          "If you still cannot find your item, You can use the search feature below",
          "info"
        );
      }
    },
    bookingNext2() {
      //swal('Calculating..');
      try {
        if (
          this.booking_moving_from == null ||
          this.booking_moving_to == null
        ) {
          swal("You have not entered a location, please do so");
          return false;
        }

        const response = axios.post(`${this.price_url}`);
        if (response) {
        }
      } catch (error) {}

      $.ajax({
        url: price_url,
        method: "POST",
        dataType: "json",
        cache: false,
        data: $("form").serialize(),
      })
        .done(function (data) {
          //console.log(data);
          $("#booking_price").val(data.price);
        })
        .fail(function (jqXHR, textStatus) {
          swal("Something went wrong, please try again.");
        });
    },
  },

  mounted() {
    this.purgeData();
    // axios
    //   .get(`${ajax_base}order/getOvertimePrice`)
    //   .then((response) => console.log(response));
  },
});
pageBook.mount("#page-book");
