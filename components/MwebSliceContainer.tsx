import React from 'react';

type SliceProps = {
    children: React.ReactNode;
    sectionId: string;
    bgColor?: string;
    padding?: string;
};
export default function MwebSliceContainer({ children, bgColor, padding, sectionId }: SliceProps) {
    return (
        <section id={`${sectionId}`} className={`${bgColor ?? ''}`}>
            <div className={`max-container-1366-center ${padding ?? ''}`}>{children}</div>
        </section>
    );
}
