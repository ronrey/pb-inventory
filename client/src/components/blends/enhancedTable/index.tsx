import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
interface Price {
    measurement: string
    quantity: number
    price: number
}
interface Blend {
    _id: string
    name: string
    state: string
    decaf: boolean
    prices: Price[]
    coffees: BlendCoffee[]
    mouthfeel: number
    acidity: number
    caramel: number
    fruit: number
    flower: number
    flavors: string[]
    qualities: string[]
    paragraphs: string[]
}
interface BlendCoffee {
    coffee_id: string
    percentage: number
}
interface Data {
    _id: string
    state: string
    name: string
    decaf: boolean
    mouthfeel: number
    acidity: number
    caramel: number
    fruit: number
    flower: number
}

interface Props {
    data: Blend[];
    onRowClick: (id: string) => void;
    onDeleteClick: (id: string) => void;

}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';
function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | boolean },
    b: { [key in Key]: number | string | boolean },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'name',
    },
    {
        id: 'state',
        numeric: true,
        disablePadding: false,
        label: 'state',
    },
    {
        id: 'decaf',
        numeric: true,
        disablePadding: false,
        label: 'decaf',
    },
    {
        id: 'mouthfeel',
        numeric: true,
        disablePadding: false,
        label: 'mouthfeel',
    },
    {
        id: 'acidity',
        numeric: true,
        disablePadding: false,
        label: 'acidity',
    },
    {
        id: 'caramel',
        numeric: true,
        disablePadding: false,
        label: 'caramel',
    },
    {
        id: 'fruit',
        numeric: true,
        disablePadding: false,
        label: 'fruit',
    },
    {
        id: 'flower',
        numeric: true,
        disablePadding: false,
        label: 'flower',
    },

];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
export const EnhancedTable: React.FC<Props> = ({ data, onDeleteClick, onRowClick }) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [page, setPage] = React.useState(0);
    const [dense,] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
        onRowClick(_id)
    };
    const handleDeleteClick = (event: React.MouseEvent<unknown>, _id: string) => {
        event.stopPropagation()
        onDeleteClick(_id)
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // Avoid a layout jump when reaching the last page with empty data.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row._id)}
                                            key={index}
                                        >
                                            <TableCell padding="checkbox">
                                                <Button onClick={(event) => handleDeleteClick(event, row._id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.state}</TableCell>
                                            <TableCell align="right">{row.decaf ? 'true' : 'false'}</TableCell>
                                            <TableCell align="right">{row.mouthfeel}</TableCell>
                                            <TableCell align="right">{row.acidity}</TableCell>
                                            <TableCell align="right">{row.caramel}</TableCell>
                                            <TableCell align="right">{row.fruit}</TableCell>
                                            <TableCell align="right">{row.flower}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}

export default EnhancedTable
