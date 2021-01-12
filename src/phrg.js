const sketch = require('sketch')
const { DataSupplier } = sketch

//constants
const DEPT = require("../constants/departments");
const TERR = require("../constants/territories");
const TERR_ABBR = require("../constants/territories_abbr");
const MONTHS = require("../constants/months");
const MONTHS_ABBR = require("../constants/months_abbr");

//startup
export function onStartup () {
  DataSupplier.registerDataSupplier('public.text', 'Departments', 'SupplyDepartments');
  DataSupplier.registerDataSupplier('public.text', 'Territories', 'SupplyTerritories');
  DataSupplier.registerDataSupplier('public.text', 'Territories (abbr)', 'SupplyTerritoriesAbbr');
  DataSupplier.registerDataSupplier('public.text', 'Months', 'SupplyMonths');
  DataSupplier.registerDataSupplier('public.text', 'Months (abbr)', 'SupplyMonthsAbbr');
}

//shutdown
export function onShutdown () {
  DataSupplier.deregisterDataSuppliers()
}

//departments
export function onSupplyDepartments(context) {
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;

  var dataIndex = 0;
  while (dataIndex < dataCount) {
      const dept = sample(DEPT);
      DataSupplier.supplyDataAtIndex(dataKey, dept, dataIndex);
      dataIndex++;
  }
}

//territories
export function onSupplyTerritories(context) {
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;

  var dataIndex = 0;
  while (dataIndex < dataCount) {
      const terr = sample(TERR);
      DataSupplier.supplyDataAtIndex(dataKey, terr, dataIndex);
      dataIndex++;
  }
}

//territories abbreviated
export function onSupplyTerritoriesAbbr(context) {
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;

  var dataIndex = 0;
  while (dataIndex < dataCount) {
      const terr_abbr = sample(TERR_ABBR);
      DataSupplier.supplyDataAtIndex(dataKey, terr_abbr, dataIndex);
      dataIndex++;
  }
}

//months
export function onSupplyMonths(context) {
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;

  var dataIndex = 0;
  while (dataIndex < dataCount) {
      const months = sample(MONTHS);
      DataSupplier.supplyDataAtIndex(dataKey, months, dataIndex);
      dataIndex++;
  }
}

//months abbreviated
export function onSupplyMonthsAbbr(context) {
  var dataKey = context.data.key;
  var dataCount = context.data.requestedCount;

  var dataIndex = 0;
  while (dataIndex < dataCount) {
      const months_abbr = sample(MONTHS_ABBR);
      DataSupplier.supplyDataAtIndex(dataKey, months_abbr, dataIndex);
      dataIndex++;
  }
}

//randomize function
const sample = array => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};
