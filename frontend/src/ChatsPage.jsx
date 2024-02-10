import { PrettyChatWindow } from 'react-chat-engine-pretty';

import { PROJECT_ID } from './config.cjs';

const ChatsPage = (props, process) => {
    return (
    <div style={{ height: '100vh'}}>
        <PrettyChatWindow
        projectId={PROJECT_ID}
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: '100%' }}
        />
    </div>
  );
};

export default ChatsPage