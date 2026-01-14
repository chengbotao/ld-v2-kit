import LdTable from "./LdTable.vue";
import LdTableColumn from "./LdTableColumn.vue";
LdTable.install = (app) => {
  app.component(LdTable.name, LdTable);
};
LdTableColumn.install = (app) => {
  app.component(LdTableColumn.name, LdTableColumn);
};

export { LdTable, LdTableColumn };
