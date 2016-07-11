$(document).ready(function() {
  

  // console.log("initializee-------");
  // console.log(md.mobile());
  // if (md.mobile() != null) {
  //   console.log("initializee-------");
  //   init({});
  // }
  //var employee = new Employee("Steve", new Date(1975,7,15), "JavaScript Inc");
 
  //$(".telInput input").mobilePhoneNumber();
  //$(".telInput input").mobilePhoneNumber("country");
  $(".telInput input").val("+63");
  $(".telInput input").mobilePhoneNumber({
    defaultPrefix: "+63"
  });
  
  $(".checkbox-remember-me").on("click", function(e) {
    updateRememberCheckbox(true);
  });

  $(".cancelButton").on("click", function() {
    updateRememberCheckbox(true);
  });

  $(".logout").on("click", function() {
    logout();
  });

  $(".back").on("click", function() {
    backVerifyCode();
  });

  $('.buttonsView').on("click", "#save-msisdn", function(e) {
    e.preventDefault();
    var valid = $("#msisdn").mobilePhoneNumber("validate");
    if (valid) {
      saveMobileNumber();
    } else {
      onInputValueDidChange("#msisdn", true);
    }
  });

});


var extend = function(child, parent) {
  for (var key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key];
  }

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
}
var hasProp = {}.hasOwnProperty;

var Person = (function() {
  function Person(name1, birthday1) {
    this.name = name1;
    this.birthday = birthday1;
  }

  Person.prototype.age = function() {
    return 12345;
  };

  return Person;

})();

var Employee = (function(superClass) {
  extend(Employee, superClass);

  function Employee(name, birthday, company) {
    this.company = company;
    Employee.__super__.constructor.call(this, name, birthday);
  }

  Employee.prototype.email = function() {
    return (this.name + "@" + (this.company.replace(/ /g, "")) + ".com").toLowerCase();
  };

  return Employee;

})(Person);
