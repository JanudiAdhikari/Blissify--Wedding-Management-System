import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCouples } from '../../../redux/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { Typography } from '@mui/material';
import { IndigoButton } from '../../../utils/buttonStyles';

const ShowCouples = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const coupleID = params.id;

    useEffect(() => {
        dispatch(getCouples(coupleID, "getInterestedCouples"));
    }, [coupleID, dispatch]);

    const { loading, couplesList, responseCouplesList } = useSelector(state => state.user);
    
    const couplesColumns = [
        { id: 'name', label: 'Couple Name', minWidth: 170 },
        { id: 'quantity', label: 'Service Quantity', minWidth: 100 },
    ]

    const couplesRows = Array.isArray(couplesList) && couplesList.length > 0
        ? couplesList.map((couple) => ({
            name: couple.coupleName,
            quantity: couple.quantity,
            id: couple.coupleID,
        }))
        : [];

    const CouplesButtonHaver = ({ row }) => {
        return (
            <>
                <IndigoButton
                    onClick={() => {
                        console.log(row.name)
                    }}
                >
                    View Couple History
                </IndigoButton >
            </>
        );
    };

    return (
        <>
            {loading ?
                <h1>
                    Loading...
                </h1>
                :
                <>
                    {responseCouplesList ?
                        <h1>
                            No Couples Till Now
                        </h1>
                        :
                        <>
                            <Typography variant="h5" gutterBottom>
                                Couples List:
                            </Typography>

                            <TableTemplate buttonHaver={CouplesButtonHaver} columns={couplesColumns} rows={couplesRows} />
                        </>
                    }
                </>
            }
        </>
    )
}

export default ShowCouples