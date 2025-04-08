import React from 'react'

export default function Pagination({Npages, currentPage}) {
    console.log("🟢Npages: ", Npages);
    console.log("🟢currentPage: ", currentPage);
    
    // [1][..][prev][curr][next][..][Npages] // 7 blocks
  return <div className="flex float-end gap-1 mt-4">{blocking(Npages, currentPage).map((i, j) => <div key={j} className={i==currentPage?"bg-success btn":"btn"}>{i}</div>)}</div>;
}

function range(start, end) {
  return [...Array(end+1-start).keys()].map((x) => x + start);
}

function blocking(Npages, currentPage){
    console.log("🟢currentPage", currentPage);
    
    let blockes;
    
    if(Npages<8){
        blockes = range(1,Npages);
    }else{
        if(currentPage < 4){
            blockes = [1,...range(2,5),"..",Npages];
        }else if(currentPage > Npages-4){
            blockes = [1,"..",...range(Npages-4,Npages)]
        }else{
            console.log("🟢");
            blockes = [1,"..",...range(currentPage-1,currentPage+1),"..",Npages];
        }
    }
    
    return blockes;
}