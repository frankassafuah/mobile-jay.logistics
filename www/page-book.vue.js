const ajax_base = "https://jaylogistic.com/api/integration/v1/index.php/";
const image_base = "https://jaylogistic.com/app/uploads/profile/";
var placeSearch,
  autocompletefrom,
  autocompleteto,
  coords,
  autocomplete,
  pricebox,
  autocompletefrombox,
  autocompletetobox,
  position;
var from_location,
  to_location,
  rider,
  riderLoc,
  item_from,
  item_to,
  markerA,
  markerB,
  markerC,
  driver_lat,
  driver_lang,
  delivery_status;
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
      ffcurrentGroup: 1,
      ffmaxGroup: 10,
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
      showBookingRegistrationDiv: false,
      showBookingPriceDiv: false,
      showBookingMomoDiv: false,
      form: {
        client_id: "",
        booking_category: "",

        booking_moving_from: "",
        booking_moving_to: "",
        booking_date: "",
        booking_distance: "",
        booking_estimated_duration: "",
        booking_time_of_pickup: "4AM - 6AM",
        booking_hire_duration: "2",
        booking_men_needed: "1",
        booking_floor_pickup: "0",
        booking_floor_deliver: "0",

        booking_ff_mode: "",

        booking_hr_other_description: "",
        booking_ip_item: "",
        booking_price: "",
        booking_payment_method: "",
        cvSpecs: [
          {
            booking_car_manufacturer: "1",
            booking_car_model: "",
            booking_car_operational: "Operational",
            booking_car_registration: "",
          },
        ],
        faSpecs: [
          {
            booking_fa_item: "Select an item",
            booking_fa_item_search: "",
            booking_fa_weight: "",
            booking_fa_dimensions: "",
            booking_fa_quantity: "1",
            booking_fa_other_description: "",
            booking_fa_url: "",
          },
        ],
        hrSpecs: [
          {
            booking_hr_item: "Select an item",
            booking_hr_item_search: "",
            booking_hr_weight: "",
            booking_hr_dimensions: "",
            booking_hr_quantity: "1",
            booking_hr_other_description: "",
            booking_hr_url: "",
          },
        ],
        ipSpecs: [
          {
            booking_ip_item: "Select an item",
            booking_ip_weight: "",
            booking_ip_dimensions: "",
            booking_ip_instructions: "",
          },
        ],
        mbSpecs: [
          {
            booking_mb_item: "Select an item",
            booking_mb_power: "",
            booking_mb_operational: "Yes",
          },
        ],
        pdSpecs: [
          {
            booking_pd_item: "Select an item",
            booking_pd_weight: "",
          },
        ],
        ffSpecs: [
          {
            booking_ff_item: "Select an item",
            booking_ff_weight: "",
            booking_ff_dimensions: "",
            booking_ff_mode: "",
            booking_ff_instructions: "",
          },
        ],
      },
    };
  },

  methods: {
    purgeData() {
      window.localStorage.setItem("JayLogisticGen", "");
      window.localStorage.setItem("JayLogisticStat", 0);
    },
    async profile(logged_in_number) {
      if (logged_in_number) {
        try {
          const response = await axios.post(`${this.profile_url}`, {
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
      if (this.cvcurrentGroup > 10) {
        return swal("Maximum " + this.cvmaxGroup + " items allowed.");
      }
      const cvSpecs = this.form.cvSpecs;
      const lastElement = cvSpecs[cvSpecs.length - 1];
      if (
        (lastElement && !lastElement.booking_car_operational) ||
        !lastElement.booking_car_registration
      ) {
        return swal("Please fill all forms");
      }
      this.form.cvSpecs.push({
        booking_car_manufacturer: "1",
        booking_car_model: "2",
        booking_car_operational: "Operational",
        booking_car_registration: "",
      });
      this.cvcurrentGroup++;
    },
    //add more fa fields group
    faaddMore() {
      if (this.facurrentGroup > 10) {
        return swal("Maximum " + this.famaxGroup + " items allowed.");
      }
      const faSpecs = this.form.faSpecs;
      const lastElement = faSpecs[faSpecs.length - 1];
      if (
        (lastElement && !lastElement.booking_fa_item) ||
        !lastElement.booking_fa_weight ||
        !lastElement.booking_fa_dimensions ||
        !lastElement.booking_fa_quantity
      ) {
        return swal("Please fill all forms");
      }
      this.form.faSpecs.push({
        booking_fa_item: "Select an item",
        booking_fa_item_search: "",
        booking_fa_weight: "",
        booking_fa_dimensions: "",
        booking_fa_quantity: "1",
        booking_fa_other_description: "",
        booking_fa_url: "",
      });
      this.facurrentGroup++;
    },
    //add more hr fields group
    hraddMore() {
      if (this.hrcurrentGroup > 10) {
        return swal("Maximum " + this.hrmaxGroup + " items allowed.");
      }
      const hrSpecs = this.form.hrSpecs;
      const lastElement = hrSpecs[hrSpecs.length - 1];
      if (
        (lastElement && !lastElement.booking_hr_item) ||
        !lastElement.booking_hr_weight ||
        !lastElement.booking_hr_dimensions ||
        !lastElement.booking_hr_quantity
      ) {
        return swal("Please fill all forms");
      }
      this.form.hrSpecs.push({
        booking_hr_item: "Select an item",
        booking_hr_item_search: "",
        booking_hr_weight: "",
        booking_hr_dimensions: "",
        booking_hr_quantity: "1",
        booking_hr_other_description: "",
        booking_hr_url: "",
      });
      this.hrcurrentGroup++;
    },
    //add more ip fields group
    ipaddMore() {
      if (this.ipcurrentGroup > 10) {
        return swal("Maximum " + this.ipmaxGroup + " items allowed.");
      }
      const ipSpecs = this.form.ipSpecs;
      const lastElement = ipSpecs[ipSpecs.length - 1];
      if (
        (lastElement && !lastElement.booking_ip_item) ||
        !lastElement.booking_ip_weight ||
        !lastElement.booking_ip_dimensions
      ) {
        return swal("Please fill all forms");
      }
      this.form.ipSpecs.push({
        booking_ip_item: "Select an item",
        booking_ip_weight: "",
        booking_ip_dimensions: "",
        booking_ip_instructions: "",
      });
      this.ipcurrentGroup++;
    },
    //add more mb fields group
    mbaddMore() {
      if (this.mbcurrentGroup > 10) {
        return swal("Maximum " + this.mbmaxGroup + " items allowed.");
      }
      const mbSpecs = this.form.mbSpecs;
      const lastElement = mbSpecs[mbSpecs.length - 1];
      if (
        (lastElement && !lastElement.booking_mb_item) ||
        !lastElement.booking_mb_power ||
        !lastElement.booking_mb_operational
      ) {
        return swal("Please fill all forms");
      }
      this.form.mbSpecs.push({
        booking_mb_item: "Select an item",
        booking_mb_power: "",
        booking_mb_operational: "",
      });
      this.mbcurrentGroup++;
    },
    //add more pd fields group
    pdaddMore() {
      if (this.pdcurrentGroup > 10) {
        return swal("Maximum " + this.pdmaxGroup + " items allowed.");
      }
      const pdSpecs = this.form.pdSpecs;
      const lastElement = pdSpecs[pdSpecs.length - 1];
      if (
        (lastElement && !lastElement.booking_pd_item) ||
        !lastElement.booking_pd_weight
      ) {
        return swal("Please fill all forms");
      }
      this.form.pdSpecs.push({
        booking_pd_item: "Select an item",
        booking_pd_weight: "",
      });
      this.pdcurrentGroup++;
    },
    //add more ff fields group
    ffaddMore() {
      if (this.ffcurrentGroup > 10) {
        return swal("Maximum " + this.ffmaxGroup + " items allowed.");
      }
      const ffSpecs = this.form.ffSpecs;
      const lastElement = ffSpecs[ffSpecs.length - 1];
      if (
        (lastElement && !lastElement.booking_ff_item) ||
        !lastElement.booking_ff_weight ||
        !lastElement.booking_ff_dimensions ||
        !lastElement.booking_ff_mode
      ) {
        return swal("Please fill all forms");
      }
      this.form.ffSpecs.push({
        booking_ff_item: "Select an item",
        booking_ff_weight: "",
        booking_ff_dimensions: "",
        booking_ff_mode: "",
        booking_ff_instructions: "",
      });
      this.ffcurrentGroup++;
    },

    async handleBookingCategoryChange() {
      swal("Information", "Categories Loading", "info");
      // AJAX FOR CATEGORIES
      if (this.form.booking_category == "cv") {
        try {
          const response = await axios.post(`${this.make_url}`);
          if (response) {
            this.carMakes = response.data;

            // POPULATE MODEL
            var ini_val = this.form.cvSpecs[0].booking_car_manufacturer;

            try {
              const response = await axios.post(`${this.model_url}/${ini_val}`);
              if (response) {
                this.carModels = [
                  {
                    id: "",
                    title: "Select a model",
                  },
                  ...response.data,
                ];
              }
            } catch (error) {
              swal("Something went wrong, please try again.");
            }
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.form.booking_category == "fa") {
        /** FURNITURE AND APPLICANCES **/
        try {
          const response = await axios.post(`${this.fa_url}`);
          if (response) {
            this.furnitureAppliances = [
              {
                name: "Select an item",
              },
              ...response.data,
            ];
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.form.booking_category == "hr") {
        /** HOME REMOVALS **/
        try {
          const response = await axios.post(`${this.hr_url}`);
          if (response) {
            this.homeRemovals = [
              {
                name: "Select an item",
              },
              ...response.data,
            ];
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.form.booking_category == "ip") {
        /** ITEMS AND PARCELS**/
        try {
          const response = await axios.post(`${this.ip_url}`);
          if (response) {
            this.itemParcels = [
              {
                name: "Select an item",
              },
              ...response.data,
            ];
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.form.booking_category == "mb") {
        /** MOTORBIKE**/
        try {
          const response = await axios.post(`${this.mb_url}`);
          if (response) {
            this.motorbikes = [
              {
                name: "Select an item",
              },
              ...response.data,
            ];
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else if (this.form.booking_category == "pd") {
        /** PIANO DELIVERY**/
        try {
          const response = await axios.post(`${this.pd_url}`);
          if (response) {
            this.pianoDeliveries = [
              {
                name: "Select an item",
              },
              ...response.data,
            ];
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      } else {
        /** FREIGHT FORWARD **/
        try {
          const response = await axios.post(`${this.ff_url}`);
          if (response) {
            this.freightForwards = [
              {
                name: "Select an item",
              },
              ...response.data,
            ];
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      }

      //END OF ALL PARENT AJAX FROM CATEGORY
    },
    // CARS AND VEHICLES
    /** MODEL  AND MANUFACUER FOR CARS AND VEHICLES**/

    async handleBookingCarManufacturerChange(carManufacturerVal) {
      //var make_val = 1;

      var make_val = carManufacturerVal;
      if (make_val) {
        try {
          const response = await axios.post(`${this.model_url}/${make_val}`);
          if (response) {
            this.carModels = [
              {
                id: "",
                title: "Select a model",
              },
              ...response.data,
            ];
          }
        } catch (error) {
          swal("Something went wrong, please try again.");
        }
      }

      // END AJAX
    },

    removeItem(index, name) {
      if (name == "cv") {
        this.form.cvSpecs.splice(index, 1);
      } else if (name == "fa") {
        this.form.faSpecs.splice(index, 1);
      } else if (name == "hr") {
        this.form.hrSpecs.splice(index, 1);
      } else if (name == "ip") {
        this.form.ipSpecs.splice(index, 1);
      } else if (name == "mb") {
        this.form.mbSpecs.splice(index, 1);
      } else if (name == "pd") {
        this.form.pdSpecs.splice(index, 1);
      } else {
        this.form.ffSpecs.splice(index, 1);
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
    async bookingNext2() {
      //swal('Calculating..');
      try {
        if (
          this.form.booking_moving_from == null ||
          this.form.booking_moving_to == null
        ) {
          swal("You have not entered a location, please do so");
          return;
        }
        const formData = new FormData();
        Object.entries(this.form).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await axios.post(`${this.price_url}`, formData);
        if (response) {
          this.form.booking_price = response.data.price;
        }
      } catch (error) {
        swal("Something went wrong, please try again.");
        return;
      }
    },
    bookingNext3() {
      var from = this.form.booking_moving_from;
      var to = this.form.booking_moving_to;
      var category = this.form.booking_category;
      var logged_in_stat = localStorage.getItem("JayLogisticStat");
      var profile_edit_first_name = this.form.profile_edit_first_name;
      var profile_edit_last_name = this.form.profile_edit_last_name;
      var profile_edit_phone = this.form.profile_edit_phone;
      var profile_edit_password = this.form.profile_edit_password;
      if (!this.form.booking_payment_method) {
        swal("Please select a payment method");
        return;
      }

      if (logged_in_stat == 0) {
        swal("Create an account to proceed");
        this.showBookingRegistrationDiv = true;
      }

      if (from && to && category) {
        if (
          logged_in_stat &&
          profile_edit_first_name &&
          profile_edit_last_name &&
          profile_edit_phone &&
          profile_edit_password
        ) {
          this.submitForm();
        } else if (logged_in_stat == 1) {
          this.submitForm();
        }
      } else {
        swal("You have not completed the form...");
      }
    },
    handleBookingPaymentMethodChange() {
      var val = this.form.booking_payment_method;
      if (val == "bid") {
        this.showBookingPriceDiv = true;
      } else if (val == "mobile") {
        this.showBookingMomoDiv = true;
      } else {
        this.showBookingPriceDiv = false;
        this.showBookingMomoDiv = false;
      }
    },
    async submitForm() {
      try {
        const formData = new FormData();
        Object.entries(this.form).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await axios.post(`${this.submit_url}`, formData);
        if (response) {
          var payment_url;
          var payment_method = this.form.booking_payment_method;
          if (payment_method == "paypal") {
            swal("Success!", "Redirecting to Payment", "success");
            payment_url =
              "https://jaylogistic.com/app/extend/paypal?i=" +
              response.data.return_id +
              "&a=" +
              response.data.return_amount;
            window.open(payment_url, "_blank");
            window.location.href = "page-profile.html";
          } else if (payment_method == "mobile") {
            swal("Success!", "Redirecting to Payment", "success");
            var logged_in_number = localStorage.getItem("JayLogisticGen");
            payment_url =
              "https://jaylogistic.com/app/paystack/pay/single/" +
              response.data.return_amount +
              "/" +
              logged_in_number +
              "/" +
              response.data.return_id;
            window.open(payment_url, "_blank");
            window.location.href = "page-profile.html";
          } else if (payment_method == "bid") {
            swal("Success!", "Booking Successful!", "success");
            window.location.href = "page-profile.html";
          }
        }
      } catch (error) {
        swal("Something went wrong, please try again.");
      }
    },
    /**** MAAPS CODE ***/

    initAutocomplete() {
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      autocompletefrom = new google.maps.places.Autocomplete(
        this.$refs["movingFrom"],
        { types: ["geocode"] }
      );

      autocompleteto = new google.maps.places.Autocomplete(
        this.$refs["movingTo"],
        { types: ["geocode"] }
      );
    },

    geolocatevalue(event) {
      console.log($(event));
      console.log($(event).val());
    },

    // Bias the autocomplete object to the user's geographical location,
    // geolocatefrom() {
    //   var geolocationfrom = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };
    //   var circlefrom = new google.maps.Circle({
    //     center: geolocationfrom,
    //     radius: position.coords.accuracy,
    //   });
    //   autocomplete.setBounds(circlefrom.getBounds());
    // },

    // geolocateto() {
    //   var geolocationto = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };
    //   var circleto = new google.maps.Circle({
    //     center: geolocationto,
    //     radius: position.coords.accuracy,
    //   });
    //   autocomplete.setBounds(circleto.getBounds());
    // },

    // $(document).on({
    //     'DOMNodeInserted': function() {
    //         $('.pac-item, .pac-item span', this).addClass('needsclick');
    //     }
    // }, '.pac-container');
  },
  mounted() {
    this.purgeData();
    // axios
    //   .get(`${ajax_base}order/getOvertimePrice`)
    //   .then((response) => console.log(response));
    this.initAutocomplete();
  },
});

pageBook.mount("#page-book");
