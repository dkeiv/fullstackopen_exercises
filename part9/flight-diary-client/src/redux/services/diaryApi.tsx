import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DiaryEntry, NewDiaryEntry } from '../../types/types';

export const diaryApi = createApi({
  reducerPath: 'diaries',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1' }),
  tagTypes: ['Diary'],
  endpoints: builder => ({
    getAllDiaries: builder.query<DiaryEntry[], void>({
      query: () => '/diaries',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Diary', id } as const)),
              { type: 'Diary', id: 'DiaryList' },
            ]
          : [{ type: 'Diary', id: 'DiaryList' }],
    }),

    addNewDiary: builder.mutation<NewDiaryEntry, NewDiaryEntry>({
      query: (newDiary: NewDiaryEntry) => ({
        url: '/diaries',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newDiary,
      }),
      invalidatesTags: [{ type: 'Diary', id: 'DiaryList' }],
    }),
  }),
});

export const { useGetAllDiariesQuery, useAddNewDiaryMutation } = diaryApi;
