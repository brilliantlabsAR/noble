{
  'targets': [
    {
      'target_name': 'noble',
      'conditions': [
        ['OS=="mac"', {
          'dependencies': [
            'lib/mac/binding.gyp:binding-<(target_arch)',
          ]
        }],
        ['OS=="win"', {
          'dependencies': [
            'lib/win/binding.gyp:binding',
          ],
        }],
      ],
    },
  ],
}
