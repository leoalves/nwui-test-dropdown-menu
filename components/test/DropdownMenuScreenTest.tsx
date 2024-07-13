import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { AlertAnchor } from '~/components/nativewindui/Alert';
import { AlertRef } from '~/components/nativewindui/Alert/types';
import { Button } from '~/components/nativewindui/Button';
import { DropdownMenu } from '~/components/nativewindui/DropdownMenu';
import { DropdownMenuRef } from '~/components/nativewindui/DropdownMenu/types';
import {
  createDropdownItem,
  createDropdownSubMenu,
} from '~/components/nativewindui/DropdownMenu/utils';
import { useColorScheme } from '~/lib/useColorScheme';

export default function DropdownMenuScreen() {
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { colors } = useColorScheme();
  const ref = React.useRef<DropdownMenuRef>(null);
  const alertRef = React.useRef<AlertRef>(null);

  const dynamicItems = React.useMemo(() => {
    return [
      createDropdownSubMenu({ title: 'Sub Menu', iOSItemSize: 'small', loading: isLoading }, [
        createDropdownSubMenu({ title: 'Submenu 2' }, [
          { actionKey: '1', title: 'Item 1' },
          { actionKey: '2', title: 'Item 2' },
        ]),
        createDropdownItem({ actionKey: '43', title: 'Item 3' }),
      ]),
      createDropdownItem({
        actionKey: '4',
        title: 'Checkbox Item',
        state: { checked },
        keepOpenOnPress: true,
        icon: {
          namingScheme: 'sfSymbol',
          name: 'checkmark.seal',
          color: colors.primary,
        },
      }),
      createDropdownItem({
        actionKey: '5',
        title: 'Set to loading',
        keepOpenOnPress: true,
        disabled: isLoading,
      }),
    ];
  }, [checked, isLoading]);

  return (
    <>
      <Stack.Screen options={{ title: 'Dropdown Menu' }} />
      <View className="flex-row justify-center flex-1 gap-8 p-8">
        <DropdownMenu
          title="Dropdown Menu"
          items={STATIC_ITEMS}
          onItemPress={(item) => {
            alertRef.current?.alert({
              title: 'Item Pressed',
              message: `Item ${item.actionKey} pressed`,
              buttons: [{ text: 'OK' }],
              materialWidth: 350,
            });
          }}>
          <Button>
            <Text>Open Dropdown</Text>
          </Button>
        </DropdownMenu>

        <DropdownMenu
          ref={ref}
          items={dynamicItems}
          onItemPress={(item) => {
            if (item.actionKey === '4') {
              setChecked((prev) => !prev);
              return;
            }
            if (item.actionKey === '5') {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1500);
              return;
            }
            alertRef.current?.alert({
              title: 'Item Pressed',
              message: `Item ${item.actionKey} pressed`,
              buttons: [{ text: 'OK' }],
              materialWidth: 350,
            });
          }}>
          <Button
            variant="secondary"
            onPress={() => {
              if (isLoading) {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1500);
              }
            }}>
            <Text>With State</Text>
          </Button>
        </DropdownMenu>
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
}

const STATIC_ITEMS = [
  createDropdownSubMenu({ title: 'Submenu 1', iOSItemSize: 'small', loading: false }, [
    createDropdownSubMenu({ title: 'Sub', iOSItemSize: 'small' }, [
      { actionKey: '10', title: 'Select Me' },
      { actionKey: '20', title: 'No! Select Me!' },
    ]),
    createDropdownItem({
      actionKey: '430',
      title: 'Item 430',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
  ]),
  createDropdownSubMenu({ title: 'Hello', iOSItemSize: 'small' }, [
    createDropdownItem({
      actionKey: '30',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
    createDropdownItem({
      actionKey: '31',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
    createDropdownItem({
      actionKey: '32',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
    createDropdownItem({
      actionKey: '33',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
  ]),
  createDropdownSubMenu({ title: '', iOSType: 'inline', iOSItemSize: 'small' }, [
    createDropdownItem({
      actionKey: '130',
      title: '💧',
    }),
    createDropdownItem({
      actionKey: '131',
      title: '💧',
    }),
    createDropdownItem({
      actionKey: '132',
      title: '💧',
    }),
    createDropdownItem({
      actionKey: '133',
      title: '💧',
    }),
  ]),
  createDropdownItem({
    actionKey: '40',
    title: 'Delete Computer',
    destructive: true,
    image: { url: 'https://picsum.photos/id/2/100', cornerRadius: 30 },
  }),
];