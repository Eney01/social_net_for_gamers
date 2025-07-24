import React from "react";
import PropTypes from "prop-types";
import styles from "./DataSeparator.module.css";

function DataSeparator(props) {
    const { data, separatorStyles } = props;

    const { styleContainer = {}, lineColor = '#000', styleText = {} } = separatorStyles;

    const stylesForContainer = {
        ...styleContainer,
        '--line-color': lineColor
    };

    return (
        <div className={styles.separator} style={stylesForContainer}>
            <span className={styles.text} style={styleText}>
                {data}
            </span>
        </div>
    );
}

DataSeparator.propTypes = {
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    separatorStyles: PropTypes.shape({
        styleContainer: PropTypes.object,
        lineColor: PropTypes.string,
        styleText: PropTypes.object,
    }),
};

DataSeparator.defaultProps = {
    separatorStyles: {
        styleContainer: {},
        lineColor: '#000',
        styleText: {},
    },
};

export default React.memo(DataSeparator);
