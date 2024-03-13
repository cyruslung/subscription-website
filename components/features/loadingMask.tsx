import React, { CSSProperties, useState, useEffect } from "react";
import styled from "styled-components";
import * as loaders from "react-spinners";


const LoadingWapper = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    `;


export default function LoadingMask(props: any | null) {
    const [showMask, setShowMask] = useState(false);

    useEffect(() => {
        setShowMask(false);
    }, []);

    useEffect(() => {
        let _showMask = false;
        if (props.showMask)
            _showMask = Boolean(props.showMask);

        setShowMask(_showMask);
    }, [props.showMask]);

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <>
            {
                !showMask && (<></>)
            }
            {
                showMask && (<LoadingWapper>
                    <div className="loader-container" >
                        {
                            <loaders.ScaleLoader
                                color={'#444'}
                                loading={showMask}
                                //ssOverride={override}
                                //size={80}

                                speedMultiplier={0.8}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        }
                    </div>
                </LoadingWapper>)
            }
        </>
    );
}