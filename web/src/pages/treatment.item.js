import React from "react";
import { Row } from "react-bootstrap";
import DataGrid from "devextreme-react/data-grid";
import TreatmetnItem from "../api/treatment.item";
import Product from "../api/product";
import Service from "../api/service";

const requiredField = { type: "required", message: "This field is required" };
const treatmentItemModel = new TreatmetnItem();
const productModel = new Product();
const serviceModel = new Service();

const TreatmentItemPage = (props) => {
  const { data, setItems } = props;
  let grid;

  const gridOptions = {
    onContentReady: (e) => {
      grid = e.component;
    },
    onInitNewRow: (e) => {
      e.data.treatment = data.id;
      e.data.discount = 0;
    },
    onRowInserted: (e) => {
      setItems((v) => v + 1);
    },
    onEditorPreparing: (e) => {
      if (e.parentType === "dataRow" && e.dataField === "service") {
        e.editorOptions.disabled = typeof e.row.data.product === "number";
      }
      if (e.parentType === "dataRow" && e.dataField === "product") {
        e.editorOptions.disabled = typeof e.row.data.service === "number";
      }
      if (e.parentType === "dataRow" && e.dataField === "cost") {
        e.editorOptions.disabled = typeof e.row.data.cost === "number";
      }
    },
    toolbar: {
      items: [
        "searchPanel",
        "addRowButton",
        {
          widget: "dxButton",
          location: "before",
          options: {
            icon: "refresh",
            onClick: () => {
              grid.refresh();
            },
          },
        },
      ],
    },
    columns: [
      {
        dataField: "product",
        dataType: "number",
        setCellValue: async function (rowData, value) {
          if (value) {
            const { price = 0 } = await productModel.find(value);
            rowData.cost = price;
            rowData.amount = 1;
            rowData.product = null;
            rowData.total = price;
          }
          this.defaultSetCellValue(rowData, value);
        },
        lookup: {
          allowClearing: true,
          displayExpr: "name",
          valueExpr: "id",
          dataSource: productModel.lookup(),
        },
      },
      {
        dataField: "service",
        setCellValue: async function (rowData, value) {
          if (value) {
            const { price = 0 } = await serviceModel.find(value);
            rowData.cost = price;
            rowData.amount = 1;
            rowData.product = null;
            rowData.total = price;
          }
          this.defaultSetCellValue(rowData, value);
        },
        lookup: {
          allowClearing: true,
          displayExpr: "name",
          valueExpr: "id",
          dataSource: serviceModel.lookup(),
        },
      },
      {
        dataField: "amount",
        format: { type: "fixedPoint", precision: 2 },
        setCellValue: function (rowData, value, data) {
          if (value) {
            rowData.total = value * data.cost - data.discount;
          }
          this.defaultSetCellValue(rowData, value);
        },
      },
      {
        dataField: "cost",
        format: { type: "fixedPoint", precision: 2 },
        setCellValue: function (rowData, value, data) {
          if (value) {
            rowData.total = data.amount * value - data.discount;
          }
          this.defaultSetCellValue(rowData, value);
        },
      },
      {
        dataField: "discount",
        format: { type: "fixedPoint", precision: 2 },
        setCellValue: function (rowData, value, data) {
          if (value) {
            rowData.total = data.amount * data.cost - value;
          }
          this.defaultSetCellValue(rowData, value);
        },
      },
      { dataField: "total", format: { type: "fixedPoint", precision: 2 } },
    ],
    searchPanel: {
      visible: true,
    },
    editing: {
      allowAdding: true,
      allowUpdating: true,
      allowDeleting: true,
      useIcons: true,
      mode: "popup",
      popup: {
        height: "auto",
        width: "60%",
        showTitle: true,
        title: "Services Form",
        shadingColor: "rgba(0,0,0, 0.7)",
      },
      form: {
        focusStateEnabled: true,
        hoverStateEnabled: true,
        activeStateEnabled: true,
        scrollingEnabled: true,
        tabIndex: 0,
        labelLocation: "top",
        showColonAfterLabel: false,
        showValidationSummary: false,
        colCount: 4,
        items: [
          {
            dataField: "product",
            colSpan: 2,
          },
          {
            dataField: "service",
            colSpan: 2,
          },
          {
            dataField: "amount",
            editorType: "dxNumberBox",
            editorOptions: { format: { type: "fixedPoint", precision: 2 } },
            validationRules: [requiredField],
          },
          {
            dataField: "cost",
            editorType: "dxNumberBox",
            editorOptions: { format: { type: "fixedPoint", precision: 2 } },
            validationRules: [requiredField],
          },
          {
            dataField: "discount",
            editorType: "dxNumberBox",
            editorOptions: { format: { type: "fixedPoint", precision: 2 } },
          },
          {
            dataField: "total",
            editorType: "dxNumberBox",
            editorOptions: {
              format: { type: "fixedPoint", precision: 2 },
              disabled: true,
            },
          },
        ],
      },
    },
  };

  return (
    <>
      <Row>
        <DataGrid
          dataSource={treatmentItemModel.makeCustomStore({
            treatment: data.id,
          })}
          {...gridOptions}
        />
      </Row>
    </>
  );
};

export default TreatmentItemPage;
