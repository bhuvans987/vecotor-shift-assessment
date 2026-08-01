// submit.js

import { Play } from 'lucide-react';

export const SubmitButton = () => {
    return (
        <div className="submit-action-bar">
            <button type="submit" className="submit-button">
                <Play size={16} fill="currentColor" />
                <span>Submit Pipeline</span>
            </button>
        </div>
    );
};
