import { AppSettingsState } from 'store/appSettings';
import { updateAppSettings } from 'store/appSettings/actions';
import { getAppSettings } from 'store/appSettings/selectors';
import useAppSelector from './useAppSelector';

const useAppSettings = () => {
    const settings = useAppSelector(getAppSettings);

    return {
        settings,
        update: (data: Partial<AppSettingsState>) => updateAppSettings(data),
    };
};

export default useAppSettings;
