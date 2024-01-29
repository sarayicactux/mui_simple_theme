import React from "react";

import DataTable from "react-data-table-component";
import downloadCSV from "./ScvTools";
import SearchColumn from "./searchColumn";
// import Pdf from "react-to-pdf";

// const ref = React.createRef();
// const options = {
//   orientation: 'landscape',
// };

const DataGrid = (props) => {
  const Export = ({ onExport }) => (
    <input
      type="button"
      className="btn btn-sm"
      onClick={(e) => onExport(e.target.value)}
      value="Export CSV"
    />
  );

  const [filteredItems, setFilteredItems] = React.useState(props.data);
  const [columns, setColumns] = React.useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [pending, setPending] = React.useState(true);
  React.useEffect(() => {
    const columns = props.columns.map((column) => {
      return {
        name: (
          <SearchColumn
            title={column.title}
            name={column.name}
            searchable={column.searchable}
            type={column.type}
            setFilteredItems={setFilteredItems}
            data={props.data}
            setResetPaginationToggle={setResetPaginationToggle}
          />
        ),
        selector: (row) => row[column.name.toLowerCase()],
        sortable: column.sortable,
      };
    });
    setColumns(columns);
    setFilteredItems(props.data);
    setTimeout(() => {
      setPending(false);
    }, 100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "همه",
    rowsPerPageText: "تعداد در هر صفحه",
    rangeSeparatorText: "از"

  };

  const actionsMemo = React.useMemo(
    () =>
      props.exportCsv ? (
        <Export onExport={() => downloadCSV(filteredItems, props.fileName)} />
      ) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredItems]
  );
  return (
    <>
      {/* <Pdf targetRef={ref} filename="code-example.pdf" options={options}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
      <div
      //  ref={ref}
      >
        <DataTable
          columns={columns}
          data={filteredItems}
          persistTableHead
          direction="right"
          fixedHeader={props.fixedHeader}
          fixedHeaderScrollHeight="460px"
          highlightOnHover
          noContextMenu
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          paginationComponentOptions={paginationComponentOptions}
          responsive={true}
          striped={true}
          paginationComponentTitle="js"
          progressComponent="در حال آماده سازی داده ها"
          noDataComponent="موردی برای نمایش وجود ندارد"
          dense
          actions={actionsMemo}
          progressPending={pending}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10,20,50,100,200,300,500,1000]}
          onRowClicked={(row, event) => {
            // console.log({ row });
            // console.log({ event });
          }}
        />
      </div>
    </>
  );
};

export default DataGrid;
