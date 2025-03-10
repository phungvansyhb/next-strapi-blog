import React from 'react';
import {type Comment} from "@/typeDefs/rawTypes";
import {DateFormatUtil, Dayjs} from "@/lib/utils";

type Props = {
    data : Comment
};

function Comment({data} : Props ) {
    return (
        <div className='p-0 lg:p-4 overflow-hidden text-ellipsis shadow shadow-accent rounded mt-4'>
            <div className='flex mb-2 items-start gap-2 text-sm'>
                <h3 className='font-bold rounded min-w-[80px] lg:min-w-[100px] capitalize'>{data.authorName}</h3>
                <p>{data.content}</p>
            </div>
            <div
                className='text-right font-light text-xs text-gray-500'>{Dayjs(data.createdAt).format(DateFormatUtil["HH:mmDD/MM/YYYY"])}</div>
        </div>
    );
}

export default Comment;