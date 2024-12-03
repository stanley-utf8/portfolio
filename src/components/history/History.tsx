import React from 'react';
import { History as HistoryInterface } from './interface';
import { Ps1 } from '../Ps1';
import AsciiPlasma from '../waves';

export const History: React.FC<{
  history: Array<HistoryInterface>;
  showEffect: boolean;
  newestId: number | null;
}> = ({ history, showEffect, newestId }) => {
  return (
    <>
      {history.map((entry: HistoryInterface) => (
        <div key={entry.command + entry.id}>
          <>
            <div className="flex flex-row space-x-2">
              <div className="flex-shrink">
                <Ps1 path={entry.path} />
              </div>
              <div className="flex-grow">{entry.command}</div>
            </div>
            <p
              className={`whitespace-pre-wrap mb-2 ${entry.id === newestId && showEffect ? 'crt-text-effect' : ''
                }`}
              style={{ lineHeight: 'normal' }}
              dangerouslySetInnerHTML={{ __html: entry.output }}
            />
          </>
        </div>
      ))}
    </>
  );
};

export default History;
