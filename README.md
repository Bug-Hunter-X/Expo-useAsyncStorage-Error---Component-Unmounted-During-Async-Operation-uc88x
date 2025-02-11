# Expo useAsyncStorage Error: Component Unmount

This repository demonstrates a common error encountered when using the Expo `useAsyncStorage` hook: the component unmounts before the asynchronous storage operation finishes. This leads to errors and warnings, potentially disrupting app functionality.

## Bug Description

The `useAsyncStorage` hook attempts to update state even after the component has been unmounted, generating warnings and potential crashes.  This typically occurs during rapid navigation or when a modal is closed unexpectedly.

## Solution

The solution involves checking if the component is still mounted before updating state.  This is done using a `mounted` ref, ensuring state updates only happen if the component remains active.