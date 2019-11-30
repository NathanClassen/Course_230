var inventory;

(function() {
  var itemCount = 0;

  inventory = {
    lastId: 0,
    collection: [],
    add: function() {
      var item = {
        id: this.lastId++,
        name: "",
        stockNumber: "",
        quantity: 1,
      };

      this.collection.push(item);

      return item;
    },
    remove: function(id) {
      this.collection = this.collection.filter(item => item.id != id);
    },
    update: function(id, attr, value) {
      var item = this.collection.find(item => item.id === id);
      switch (attr) {
        case 'itemname':
          item.name = value;
          break;
        case 'itemstocknumber':
          item.stockNumber = value;
          break;
        case 'itemquantity':
          item.quantity = Number(value);
      }
    },
    insertItemRow: function($item) {
      $("#inventory").append($item);
    },
    newItem: function(e) {
      e.preventDefault();
      var item  = this.add();
      var $item = $(this.template.replace(/ID/g, item.id));
      this.insertItemRow($item);
    },
    updateItem: function(e) {
      var $item = $(e.target);
      var attr  = $item[0].name.replace(/[^a-z]/g, "");
      var value = $item.val();
      var id    = this.getId($item);
      this.update(id, attr, value);
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $item = $(e.target).closest("tr").remove();
      var id    = this.getId($item);
      this.remove(id);
    },
    getId: function($item) {
      return Number($item.closest("tr").find("input:hidden").val());
    },
    setDate: function() {
      var date = new Date();
      $("#order_date").text(date.toUTCString());
    },
    cacheTemplate: function() {
      var $i_tmpl = $("#inventory_item").remove();
      this.template = $i_tmpl.html();
    },
    bindEvents: function() {
      $("#add_item").on("click", this.newItem.bind(this));
      $("#inventory").on("click", "a.delete", this.deleteItem.bind(this));
      $("#inventory").on("blur", "input[name*='item']", this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  };
})();

$(inventory.init.bind(inventory));
